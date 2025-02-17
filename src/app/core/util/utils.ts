import { Injectable, } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';
import { CompanyService } from '../services/helpers/company/company.service';
import { PrivilegyService } from '../services/helpers/privilegy/privilegy.service';
import { MenuService } from '../services/helpers/menu/menu.service';
import { UserLoggedServiceService } from '../services/helpers/userLoggedService/user-logged-service.service';
import { WsAuthenticateService } from '../services/ws-authenticate/ws-authenticate.service';
import { RouteService } from '../services/helpers/routeServices/route-services';
import { LanguageServiceService } from '../services/helpers/languageService/language-service.service';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class Utils {


  constructor(private router: Router, private loadingService: LoadingService, private messageService: MessageService,
    private companyService: CompanyService, private privilegyService: PrivilegyService,
    private userLoggedServiceService: UserLoggedServiceService, private wsAuthenticateService: WsAuthenticateService
    , private menuService: MenuService, private routeService: RouteService, private languageServiceService: LanguageServiceService,private translate:TranslateService) { }


  processRefresh() {

    // store data into local storage before browser refresh
    localStorage.setItem('SESSIONERPAPPUUID', this.userLoggedServiceService.getBrowserUuid());
    localStorage.setItem('SESSIONERPAPPUSN', this.userLoggedServiceService.getUserName());
    localStorage.setItem("SESSIONERPAPPTKN", this.userLoggedServiceService.getToken());
    localStorage.setItem("SESSIONERPAPPI18N", this.languageServiceService.getLanguage());
    localStorage.setItem("SESSIONERPAPPCMY", JSON.stringify(this.companyService.getCompany()));
    localStorage.setItem("SESSIONERPAPPPER", JSON.stringify(this.privilegyService.getPrivilegy()));
    localStorage.setItem("SESSIONERPAPPPMN", JSON.stringify(this.menuService.getMenu()));
    // localStorage.setItem("SESSIONERPAPPROUTE",JSON.stringify(this.routeService.getRoute()));
  }

  logOut(): any {
    debugger;
    // localStorage.removeItem("SESSIONERPAPPTK");
    // localStorage.removeItem('SESSIONERPAPPUSN');
    this.userLoggedServiceService.setUserName(undefined);
    this.userLoggedServiceService.setToken(undefined);
    this.companyService.setCompany(undefined);
    this.privilegyService.setPrivilegy(undefined);
    this.menuService.setMenu(undefined);
    // this.routeService.setRoute(undefined);
    //localStorage.removeItem('SESSIONERPAPPUSR');
    //localStorage.removeItem('SESSIONERPAPPAUT');
    this.userLoggedServiceService.setUserLoggedIn(false);
    this.router.navigate(['/Login']);
  }


  subscribeHandler(component: any, functon: Function, funcErr?: Function): any {
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
        // this.messageService.showDangerMessage(e.message);
        this.messageService.showDangerMessage("Servicio no disponible favor de intentar más tarde.");
        // funcErr!()
        this.router.navigate(['/Login']);
      }
    }
  }
  subscribeRefreshHandler(component: any, functon: Function, funcErr?: Function): any {
    return {
      next: (response: any) => {
        debugger;
        this.loadingService.setLoading(false);
        if (response.status == 200) {
          var body = response.body;
          if (body.tipoMensaje == 'S') {
            const headers = response.headers;
            const authorization = headers.get('Authorization');
            const token = authorization.replace('Bearer ', '').trim();
            functon(component, token);
          } else {
            this.messageService.showDangerMessage(body.mensaje);
            funcErr!();

          }
        }
      },
      error: (e: any) => {
        
        this.loadingService.setLoading(false);
        // this.messageService.showDangerMessage(e.message);
        this.messageService.showDangerMessage("Servicio no disponible favor de intentar más tarde.");
        // funcErr!()
        this.router.navigate(['/Login']);
      }
    }
  }

  getBearerToken(): HttpHeaders {
    debugger;
    // let session = localStorage.getItem('SESSIONERPAPPTK');
    const session = this.userLoggedServiceService.getToken();
    if (session == null || session == undefined) {
      // this.router.navigate(['/Login']);
      return new HttpHeaders();
    }
    console.log(session);
    let headers = new HttpHeaders()
      .set("Authorization", 'Bearer ' + session)
      .set('X-Client-Type','browser')
      .set('X-Browser-ID',this.userLoggedServiceService.getBrowserUuid());

    // .set("Allow",'POST,PUT,GET,DELETE,OPTIONS');
    console.log(headers);
    return headers;



  }

  setvaliate(component: any, result: string) {
    debugger;
    component.userLoggedServiceService.setToken(result);
  }

  getSession() {
    //  const session = localStorage.getItem('SESSIONERPAPPTK');

    const session = this.userLoggedServiceService.getToken();
    if (session == null || session == undefined) {
      this.router.navigate(['/Login']);
      return;
    } else {
      this.wsAuthenticateService.refesh(this.getUsername(), this).subscribe(
        this.subscribeRefreshHandler(this, this.setvaliate, () => this.router.navigate(['/Login']))
      );
    }
  }


  getUsername(): any {
    const username = this.userLoggedServiceService.getUserName();
    if (username === undefined) {
      this.messageService.showDangerMessage("utils.USERNAME_ERROR");
      this.router.navigate(['/Login']);
      return;
    }
    return username;
  }

  validateCompany() {

    if (this.companyService.getCompany() === undefined) {
      this.messageService.showDangerMessage("utils.COMPANY_ERROR");
      this.router.navigate(['/Login']);
      return;
    }
  }

  validatePermissions() {

    if (this.privilegyService.getPrivilegy() === undefined) {
      this.messageService.showDangerMessage("utils.PERMISION_ERROR");
      this.router.navigate(['/Login']);
      return;
    }
  }


  validateMenu() {
    if (this.menuService.getMenu() === undefined) {
      this.messageService.showDangerMessage("utils.MENU_ERROR");
      this.router.navigate(['/Login']);
      return;
    }
  }

  validate() {
    this.validateCompany();
    this.validatePermissions();
    this.validateMenu();
    this.getSession();
  }

  changeTheme(): void {



    var bodyStyles = document.body.style;
    const color = localStorage.getItem('ERPAPPCOLOR');
    if (color == null || color == undefined) {
      bodyStyles.setProperty('--top-color', 'linear-gradient(-180deg,#000000, #fc0303)');
      bodyStyles.setProperty('--start-color', 'linear-gradient(-45deg,#000000, #fc0303)');
      bodyStyles.setProperty('--end-color', 'linear-gradient(-135deg,#000000, #fc0303)');
      bodyStyles.setProperty('--bottom-color', 'linear-gradient(-00deg,#000000, #fc0303)');
      bodyStyles.setProperty('--start-login-color', 'linear-gradient(90deg,#000000, #fc0303)');
    } else {
      bodyStyles.setProperty('--top-color', 'linear-gradient(-180deg,#000000, ' + color + ')');
      bodyStyles.setProperty('--start-color', 'linear-gradient(-45deg,#000000, ' + color + ')');
      bodyStyles.setProperty('--end-color', 'linear-gradient(-135deg,#000000, ' + color + ')');
      bodyStyles.setProperty('--bottom-color', 'linear-gradient(-00deg,#000000, ' + color + ')');
      bodyStyles.setProperty('--start-login-color', 'linear-gradient(90deg,#000000, ' + color + ')');
    }



  }
  resetTheme(): void {
    var bodyStyles = document.body.style;
    bodyStyles.setProperty('--top-color', 'linear-gradient(-180deg,#000000, #fc0303)');
    bodyStyles.setProperty('--start-color', 'linear-gradient(-45deg,#000000, #fc0303)');
    bodyStyles.setProperty('--end-color', 'linear-gradient(-135deg,#000000, #fc0303)');
    bodyStyles.setProperty('--bottom-color', 'linear-gradient(-00deg,#000000, #fc0303)');
    bodyStyles.setProperty('--start-login-color', 'linear-gradient(90deg,#000000, #fc0303)');
    localStorage.removeItem("ERPAPPCOLOR");
  }

  getFormValidationErrors(form:any) : string[] {
    let result : any = [];
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push(this.translate.instant(`${key}:${keyError}`));
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    return result;
  }
  //   getUserBean() : any{

  //     const UserBean = localStorage.getItem('SESSIONERPAPPUSR');
  //     if(UserBean ==null || UserBean == undefined){
  //        // this.router.navigate(['/Login']);
  //         return;
  //     }
  //       return JSON.parse(atob(UserBean));
  // } 

  //   getAuthorities() : any{

  //     const authorities = localStorage.getItem('SESSIONERPAPPAUT');
  //     if(authorities ==null || authorities == undefined){
  //        // this.router.navigate(['/Login']);
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
