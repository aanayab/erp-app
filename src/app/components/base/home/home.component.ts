import { Input, Component, Output, ChangeDetectionStrategy, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../../core/util/utils';
import {  Router } from '@angular/router';
import { WsAuthenticateService } from '../../../core/services/ws-authenticate/ws-authenticate.service'
import { UserBean } from 'src/app/core/model/userBean';
import { WsSysAdminService } from 'src/app/core/services/ws-sysAdmin/ws-sys-admin.service';
import { PrivilegyBean } from 'src/app/core/model/peivilegyBean';
import { ScreenBean } from 'src/app/core/model/screenBean';
import { PrivilegyService } from 'src/app/core/services/helpers/privilegy/privilegy.service';
import { UserLoggedServiceService } from 'src/app/core/services/helpers/userLoggedService/user-logged-service.service';
import { MenuService } from 'src/app/core/services/helpers/menu/menu.service';
import { FoodNode } from 'src/app/core/model/foodNode';
import { Route } from 'src/app/core/model/Route';
import { RouteService } from 'src/app/core/services/helpers/routeServices/route-services';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';


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
      component.messageService.showDangerMessage("utils.USERNAME_ERROR");
      component.router.navigate(['/Login']);
      return;
    }
    component.user = user;
    const authorities = user.authorities;
    if(authorities === undefined || authorities === null || authorities.length === 0){
      component.messageService.showDangerMessage("utils.PERMISION_ERROR");
      component.router.navigate(['/Login']);
      return;
    }

    // component.getRoute(authorities![0].authority);
    component.getPrivielegy(authorities![0].authority);
    component.getMenu(authorities![0].authority);

    // component.userName = this.utils.getUsername();  
    //this.ref.detectChanges();
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
    // result.forEach((element: any) => {
    //   let key: any = element.grupo.keyGroup + '|' + element.grupo.ruta;
    //   let value: any = component.menu.get(key);
    //   if (value == undefined) {
    //     value = [];
    //   }
    //   value.push(element.screen);
      // component.menu.set(key, value);


    // });

  }

  getMenu(role: any) {
    debugger;
        this.wsSysAdminService.getFoodNodeByRole(role)
      .subscribe(this.utils.subscribeHandler(this, this.setMenu,() =>{ this.router.navigate(['/Login']);})
      );
  }


  // setRoute(component: any, result: any) {
  //    
  //   component.routes = result;
  //   component.routeService.setRoute(result);
  //   // component.router.config = result;
  //   // result.forEach((element: any) => {
  //   //   let key: any = element.grupo.keyGroup + '|' + element.grupo.ruta;
  //   //   let value: any = component.menu.get(key);
  //   //   if (value == undefined) {
  //   //     value = [];
  //   //   }
  //   //   value.push(element.screen);
  //     // component.menu.set(key, value);


  //   // });

  // }

  // getRoute(role: any) {

  //   this.wsSysAdminService.getRouteByRole(role)
  //     .subscribe(this.utils.subscribeHandler(this, this.setRoute)
  //     );
  // }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'white';
  }


  getRouter(): Router {
    return this.router;
  }



  ngOnInit() {
    // this.utils.getSession();
    this.getUser();


    // this.router.navigate(['/']);
  }

  title: string = "Hola";

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