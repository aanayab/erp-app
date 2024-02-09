import { Input, Component, Output,ChangeDetectionStrategy, EventEmitter,AfterViewInit,ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../services/util/utils';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { WsAuthenticateService } from '../../services/ws-authenticate/ws-authenticate.service'
import { UserBean } from 'src/app/model/userBean';
import { WsSysAdminService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.service';
import { PrivilegyBean } from 'src/app/model/peivilegyBean';
import { GroupBean } from 'src/app/model/groupBean';
import { ScreenBean } from 'src/app/model/screenBean';
import { PrivilegyService } from 'src/app/services/privilegy/privilegy.service';






@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements AfterViewInit {


  privilegy?:PrivilegyBean;
  user?:UserBean;  
  collapsed:boolean = true;
  screens?:ScreenBean[];
  menu: Map<GroupBean, ScreenBean[]> = new Map(); 
  showMenu:Boolean = false;



  constructor(private elementRef: ElementRef, private utils:Utils,public router: Router, private wsAuthenticateService:WsAuthenticateService, private wsSysAdminService: WsSysAdminService, private privilegyService:PrivilegyService) {    

  }


  
  setUser(component:any,result:UserBean) {   
    
    component.user = result;  
    let authorities = result.authorities;
    
    component.getPrivielegy(authorities![0].authority);
    ///localStorage.setItem('SESSIONERPAPPAUT', btoa(result.authorities));
   // component.userName = this.utils.getUsername();  
    //this.ref.detectChanges();
  }

  getUser() {   
      this.wsAuthenticateService.getUser(this.utils.getUsername())
        .subscribe(this.utils.subscribeHandler(this,this.setUser)
        );
  }

  setPrivilegy(component:any,result:any) {    
    component.privilegy = result; 
    component.privilegyService.setPrivilegy(result);
    result.forEach((element:any) => {
      let key:any = element.grupo;
      let value:any  = component.menu.get(key);
      if(value == undefined){
        value = [];
      }
      value.push(element.screen);
      component.menu.set(key,value);
          

    });

  }

  getPrivielegy(role:any) {   
    
      this.wsSysAdminService.getPrivilegyByRole(role)
        .subscribe(this.utils.subscribeHandler(this,this.setPrivilegy)
        );
  }



  // setUser(component:any,result:any) {   
    
  //   localStorage.setItem('SESSIONERPAPPUSR', btoa(result));
  //   localStorage.setItem('SESSIONERPAPPAUT', btoa(result.authorities));
  //   //this.ref.detectChanges();
  // }

  // getUser() {   
  //     this.wsAuthenticateService.getUser(this.utils.getUsername())
  //       .subscribe(this.utils.subscribeHandler(this,this.setUser)
  //       );
  // }
  
  
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'white';
  }




  simpleAlert(){
    Swal.fire('{{this.userBean}}');

  }

  ngOnInit() {
   this.utils.getSession();
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

  sidevarChange(component:any) {
    debugger;
    component.collapsed = !component.collapsed;
    component.showMenu = !component.showMenu;
    }
    

}