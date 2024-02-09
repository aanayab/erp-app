import { Injectable, } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { WsAuthenticateService } from '../../services/ws-authenticate/ws-authenticate.service'
import { LoadingService } from 'src/app/services/loading/loading.service';
import { CompanyService } from '../company/company.service';
import { PrivilegyService } from '../privilegy/privilegy.service';

@Injectable({
    providedIn: 'root'
  })
export class Utils {

constructor(private router: Router,private loadingService:LoadingService, private messageService:MessageService,private companyService:CompanyService,private privilegyService:PrivilegyService){}



logOut() : any{
    
  localStorage.removeItem("SESSIONERPAPPTK");
  localStorage.removeItem('SESSIONERPAPPUSN');
  this.companyService.company = undefined;
  this.privilegyService.privilegy = undefined;
  //localStorage.removeItem('SESSIONERPAPPUSR');
  //localStorage.removeItem('SESSIONERPAPPAUT');
  this.router.navigate(['/login']);
}


subscribeHandler(component:any,functon:Function): any {
  return {
   next: (response: any) => {
    
    this.loadingService.setLoading(false);
     if (response.status == 200) {
       var body = response.body;
       if (body.tipoMensaje == 'S') {
       functon(component,body.result);
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
 getBearerToken() : HttpHeaders{
      
      let session = localStorage.getItem('SESSIONERPAPPTK');
       if(session ==null || session == undefined){
        this.router.navigate(['/login']);
        return new HttpHeaders();
        }
        let headers = new HttpHeaders()   
      .set("Authorization", 'Bearer ' + JSON.parse(atob(session)));
      
      // .set("Allow",'POST,PUT,GET,DELETE,OPTIONS');
      return headers;


    }

  

  getSession(){
           const session = localStorage.getItem('SESSIONERPAPPTK');
        if(session ==null || session == undefined){
            this.router.navigate(['/login']);
            return;
        }
    }


    getUsername() : any{
     
      const username = localStorage.getItem('SESSIONERPAPPUSN');
      if(username ==null || username == undefined){
        //  this.router.navigate(['/login']);
          return;
      }
        return JSON.parse(atob(username));
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
