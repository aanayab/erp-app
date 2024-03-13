import { Injectable, } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { CompanyService } from '../services/company/company.service';
import { PrivilegyService } from '../services/privilegy/privilegy.service';
import { UserLoggedServiceService } from '../services/userLoggedService/user-logged-service.service';
import { WsAuthenticateService } from '../services/ws-authenticate/ws-authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class Utils {


  constructor(private router: Router, private loadingService: LoadingService, private messageService: MessageService, private companyService: CompanyService, private privilegyService: PrivilegyService,
    private userLoggedServiceService: UserLoggedServiceService,private wsAuthenticateService:WsAuthenticateService) { }



  logOut(): any {

    // localStorage.removeItem("SESSIONERPAPPTK");
    // localStorage.removeItem('SESSIONERPAPPUSN');
    this.userLoggedServiceService.setUserName(undefined);
    this.userLoggedServiceService.setToken(undefined);
    this.companyService.setCompany(undefined);
    this.privilegyService.setPrivilegy(undefined);
    //localStorage.removeItem('SESSIONERPAPPUSR');
    //localStorage.removeItem('SESSIONERPAPPAUT');
    this.userLoggedServiceService.setUserLoggedIn(false);
    this.router.navigate(['/login']);
  }


  subscribeHandler(component: any, functon: Function,funcErr?:Function): any {
    return {
      next: (response: any) => {

        this.loadingService.setLoading(false);
        if (response.status == 200) {
          var body = response.body;
          if (body.tipoMensaje == 'S') {
            functon(component, body.result);
          } else {
            this.messageService.showDangerMessage(body.mensaje);
            funcErr!();

          }
        }
      },
      error: (e: any) => {

        this.loadingService.setLoading(false);
        this.messageService.showDangerMessage(e.message);
        funcErr!()
      }
    }
  }

  getBearerToken(): HttpHeaders {
    
    // let session = localStorage.getItem('SESSIONERPAPPTK');
    const session = this.userLoggedServiceService.getToken();
    if (session == null || session == undefined) {
      // this.router.navigate(['/login']);
      return new HttpHeaders();
    }
    console.log(session);
    let headers = new HttpHeaders()
      .set("Authorization", 'Bearer ' + session);

    // .set("Allow",'POST,PUT,GET,DELETE,OPTIONS');
    console.log(headers);
    return headers;



  }

 setvaliate(component: any, result: string) {  
  component.userLoggedServiceService.setToken(result);
}

  getSession() {
    //  const session = localStorage.getItem('SESSIONERPAPPTK');

    const session = this.userLoggedServiceService.getToken();
    if (session == null || session == undefined) {
       this.router.navigate(['/login']);
      return;
    }else{
      this.wsAuthenticateService.refesh(this.getUsername(),this).subscribe(
        this.subscribeHandler(this, this.setvaliate,() =>this.router.navigate(['/login']))
      );
    }
  }


  getUsername(): any {
     const username = this.userLoggedServiceService.getUserName();
    if (username === undefined) {
      this.messageService.showDangerMessage("USERNAME_ERROR");
       this.router.navigate(['/login']);
      return;
    }
    return username;
  }

  validateCompany() {
    
    if (this.companyService.getCompany() === undefined) {
      this.messageService.showDangerMessage("COMPANY_ERROR");
      this.router.navigate(['/login']);
      return;
    }
  }

  validatePermissions() {
    if (this.privilegyService.getPrivilegy() === undefined) {
      this.messageService.showDangerMessage("PERMISION_ERROR");
       this.router.navigate(['/login']);
      return;
    }
  }


  changeTheme(): void{
    debugger;


    var bodyStyles = document.body.style;
    const color = localStorage.getItem('ERPAPPCOLOR');
         if(color ==null || color == undefined){
          bodyStyles.setProperty('--top-color', 'linear-gradient(-180deg,#000000, #fc0303)');
          bodyStyles.setProperty('--start-color', 'linear-gradient(-45deg,#000000, #fc0303)');
          bodyStyles.setProperty('--end-color', 'linear-gradient(-135deg,#000000, #fc0303)');
          bodyStyles.setProperty('--bottom-color', 'linear-gradient(-00deg,#000000, #fc0303)');
          bodyStyles.setProperty('--start-login-color', 'linear-gradient(90deg,#000000, #fc0303)');
         }else{
          bodyStyles.setProperty('--top-color', 'linear-gradient(-180deg,#000000, '+color+')');
          bodyStyles.setProperty('--start-color', 'linear-gradient(-45deg,#000000, '+color+')');
          bodyStyles.setProperty('--end-color', 'linear-gradient(-135deg,#000000, '+color+')');
          bodyStyles.setProperty('--bottom-color', 'linear-gradient(-00deg,#000000, '+color+')');
          bodyStyles.setProperty('--start-login-color', 'linear-gradient(90deg,#000000, '+color+')');
         }

   
  
  }
  //   getUserBean() : any{

  //     const UserBean = localStorage.getItem('SESSIONERPAPPUSR');
  //     if(UserBean ==null || UserBean == undefined){
  //        // this.router.navigate(['/login']);
  //         return;
  //     }
  //       return JSON.parse(atob(UserBean));
  // } 

  //   getAuthorities() : any{

  //     const authorities = localStorage.getItem('SESSIONERPAPPAUT');
  //     if(authorities ==null || authorities == undefined){
  //        // this.router.navigate(['/login']);
  //         return;
  //     }
  //       return JSON.parse(atob(authorities));
  // } 

  // validateRoot() : boolean{

  //   let authorities = this.getAuthorities();
  //   authorities.forEach((value:any) => {
  //     // console.log(value);
  //     if(value.authority === "ROLE_ROOT"){
  //       return true;
  //     }else{
  //       return false;
  //     }
  //   });

  //     return authorities;
  // } 

}
