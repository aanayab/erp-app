import { Injectable, } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { CompanyService } from '../services/company/company.service';
import { PrivilegyService } from '../services/privilegy/privilegy.service';
import { UserLoggedServiceService } from '../services/userLoggedService/user-logged-service.service';

@Injectable({
  providedIn: 'root'
})
export class Utils {


  constructor(private router: Router, private loadingService: LoadingService, private messageService: MessageService, private companyService: CompanyService, private privilegyService: PrivilegyService,
    private userLoggedServiceService: UserLoggedServiceService) { }



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


  subscribeHandler(component: any, functon: Function): any {
    return {
      next: (response: any) => {

        this.loadingService.setLoading(false);
        if (response.status == 200) {
          var body = response.body;
          if (body.tipoMensaje == 'S') {
            functon(component, body.result);
          } else {
            this.messageService.showDangerMessage(body.mensaje);

          }
        }
      },
      error: (e: any) => {

        this.loadingService.setLoading(false);
        this.messageService.showDangerMessage(e.message);
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
    let headers = new HttpHeaders()
      .set("Authorization", 'Bearer ' + session);

    // .set("Allow",'POST,PUT,GET,DELETE,OPTIONS');
    console.log(headers);
    return headers;



  }



  getSession() {
    //  const session = localStorage.getItem('SESSIONERPAPPTK');
    const session = this.userLoggedServiceService.getToken();
    if (session == null || session == undefined) {
      // this.router.navigate(['/login']);
      return;
    }
  }


  getUsername(): any {
     const username = this.userLoggedServiceService.getUserName();
    if (username === undefined) {
      this.messageService.showDangerMessage("USERNAME_ERROR");
      // this.router.navigate(['/login']);
      return;
    }
    return username;
  }

  validateCompany() {
    
    if (this.companyService.getCompany() === undefined) {
      this.messageService.showDangerMessage("COMPANY_ERROR");
      // this.router.navigate(['/login']);
      return;
    }
  }

  validatePermissions() {
    if (this.privilegyService.getPrivilegy() === undefined) {
      this.messageService.showDangerMessage("PERMISION_ERROR");
      // this.router.navigate(['/login']);
      return;
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
