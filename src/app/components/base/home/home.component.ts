import { Input, Component, Output, ChangeDetectionStrategy, EventEmitter, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../../core/util/utils';
import { NavigationStart, Router } from '@angular/router';
import { WsAuthenticateService } from '../../../core/services/ws-authenticate/ws-authenticate.service'
import { UserBean } from 'src/app/core/model/userBean';
import { WsSysAdminService } from 'src/app/core/services/ws-sysAdmin/ws-sys-admin.service';
import { PrivilegyBean } from 'src/app/core/model/peivilegyBean';
import { GroupBean } from 'src/app/core/model/groupBean';
import { ScreenBean } from 'src/app/core/model/screenBean';
import { PrivilegyService } from 'src/app/core/services/privilegy/privilegy.service';
import { UserLoggedServiceService } from 'src/app/core/services/userLoggedService/user-logged-service.service';
import { Subscription } from 'rxjs';


export let browserRefresh = false;


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements AfterViewInit {


  privilegy?: PrivilegyBean;
  user?: UserBean;
  collapsed: boolean = true;
  screens?: ScreenBean[];
  menu: Map<String, ScreenBean[]> = new Map();
  showMenu: Boolean = false;






  constructor(private elementRef: ElementRef, private utils: Utils, private router: Router,
    private wsAuthenticateService: WsAuthenticateService,
    private wsSysAdminService: WsSysAdminService, private privilegyService: PrivilegyService,private userLoggedServiceService:UserLoggedServiceService) {


     

  }


  

  setUser(component: any, result: UserBean) {

    component.user = result;
    let authorities = result.authorities;

    component.getPrivielegy(authorities![0].authority);

    // component.userName = this.utils.getUsername();  
    //this.ref.detectChanges();
  }

  getUser() {
    this.wsAuthenticateService.getUser(this.utils.getUsername(),this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setUser)
      );
  }

  setPrivilegy(component: any, result: any) {
    debugger;
    component.privilegy = result;
    component.privilegyService.setPrivilegy(result);
    result.forEach((element: any) => {
      let key: any = element.grupo.keyGroup + '|' + element.grupo.ruta;
      let value: any = component.menu.get(key);
      if (value == undefined) {
        value = [];
      }
      value.push(element.screen);
      component.menu.set(key, value);


    });

  }

  getPrivielegy(role: any) {

    this.wsSysAdminService.getPrivilegyByRole(role)
      .subscribe(this.utils.subscribeHandler(this, this.setPrivilegy)
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