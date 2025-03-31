import { Input, Component, Output, ChangeDetectionStrategy, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../util/utils';
import {  Router } from '@angular/router';
import { WsAuthenticateService } from '../../services/ws-authenticate/ws-authenticate.service'
import { UserBean } from 'src/app/model/userBean';
import { WsSysAdminService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.service';
import { PrivilegyBean } from 'src/app/model/peivilegyBean';
import { ScreenBean } from 'src/app/model/screenBean';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { MenuService } from 'src/app/services/helpers/menu/menu.service';
import { FoodNode } from 'src/app/model/foodNode';
import { Route } from 'src/app/model/Route';
import { RouteService } from 'src/app/services/helpers/routeServices/route-services';
import { MessageService } from 'src/app/services/helpers/message/message.service';


export let browserRefresh = false;


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements AfterViewInit {


  privilegy?: PrivilegyBean;
  foodNode?: FoodNode[];
  user?: UserBean;
  collapsed: boolean = true;
  screens?: ScreenBean[];
  showMenu: Boolean = false;
  routes?:Route[];






  constructor(private elementRef: ElementRef, private utils: Utils, private router: Router,
    private wsAuthenticateService: WsAuthenticateService,
    private wsSysAdminService: WsSysAdminService,
    private privilegyService: PrivilegyService,private userLoggedServiceService:UserLoggedServiceService
    ,private menuService: MenuService,private routeService:RouteService, private messageService:MessageService) {


     

  }


  

  setUser(component: any, result: UserBean) {
    const user = result;
    if(user === undefined || user === null){
      component.messageService.showDangerMessage("HOME.USERNAME_ERROR");
      component.router.navigate(['/Login']);
      return;
    }
    component.user = user;
    const authorities = user.authorities;
    if(authorities === undefined || authorities === null || authorities.length === 0){
      component.messageService.showDangerMessage("HOME.PERMISION_ERROR");
      component.router.navigate(['/Login']);
      return;
    }


    component.getPrivielegy(authorities![0].authority);
    component.getMenu(authorities![0].authority);

  }

  getUser() {
    this.wsAuthenticateService.getUser(this.utils.getUsername(),this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setUser)
      );
  }

  setPrivilegy(component: any, result: any) {
    component.privilegy = result;
    component.privilegyService.setPrivilegy(result);
  }

  getPrivielegy(role: any) {

    this.wsSysAdminService.getPrivilegyByRole(role)
      .subscribe(this.utils.subscribeHandler(this, this.setPrivilegy)
      );
  }

  setMenu(component: any, result: any) { 
    component.foodNode = result;
    component.menuService.setMenu(result);
  }

  getMenu(role: any) {
    
        this.wsSysAdminService.getFoodNodeByRole(role)
      .subscribe(this.utils.subscribeHandler(this, this.setMenu,() =>{ this.router.navigate(['/Login']);})
      );
  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'white';
  }


  getRouter(): Router {
    return this.router;
  }



  ngOnInit() {
    this.getUser();
  }

  @Input() error: string = '';

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  sidevarChange(component: any) {
    component.collapsed = !component.collapsed;
    component.showMenu = !component.showMenu;
  }


}