import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';


import { AppComponent } from '../components/app/app.component';
import { LoginFormComponent } from '../components/modules/login-form/login-form.component';
import { HomeComponent } from '../components/base/home/home.component';
import { RouterModule } from '@angular/router';
import {MessagesComponent} from '../components/base/messages/messages.component';
import {HeaderComponent} from '../components/base/header/header.component';
import { FooterComponent } from '../components/base/footer/footer.component'; 
import { LoadingComponent } from '../components/base/loading/loading.component';
import { CompanySelectorComponent } from '../components/base/company-selector/company-selector.component';
import { LenguageSelectorComponent } from '../components/base/lenguage-selector/lenguage-selector.component';
import {UserInfoComponent} from '../components/base/user-info/user-info-component'
import { MenuComponent } from '../components/base/menu/menu.component';
import { MenuMobileComponent } from '../components/base/menu-mobile/menu-mobile.component';
import { PhoneSelectorComponent } from '../components/base/phone-selector/phone-selector.component';

import { AdminComponent } from '../components/modules/admin/admin.component';
import { AuditComponent } from '../components/modules/auditoria/auditoria.component';
import { ContaComponent } from '../components/modules/contabilidad/contabilidad.component';
import { CostSuccComponent } from '../components/modules/cost-succ/cost-succ.component';
import { CustomerComponent } from '../components/modules/costumers/costumers.component';
import { DirComponent } from '../components/modules/direccion/direccion.component';
import { DoComponent } from '../components/modules/do/do.component';
import { FinanzasComponent } from '../components/modules/finanzas/finanzas.component';
import { GestionComponent } from '../components/modules/gestion/gestion.component';
import { HrComponent } from '../components/modules/hr/hr.component';
import { InvComponent } from '../components/modules/inventarios/inventarios.component';
import { MktComponent } from '../components/modules/marketing/marketing.component';
import { OpComponent } from '../components/modules/operaciones/operaciones.component';
import { ProdComponent } from '../components/modules/produccion/produccion.component';
import { PvComponent } from '../components/modules/punto-venta/punto-venta.component';
import { SalesComponent } from '../components/modules/sales/sales.component';
import { SupportComponent } from '../components/modules/support/support.component';
import { SysAdminComponent } from '../components/modules/sys-admin/sys-admin.component';
import { PurchComponent } from '../components/modules/compras/compras.component';
import { BreadcrumbComponent } from '../components/base/breadcrumb/breadcrumb.component';
import { MainComponent } from '../components/modules/main/main.component';
import { IdleModalComponent } from '../components/base/idle-modal/idle-modal.component';
import { UserFormComponent } from '../components/modules/sys-admin/users/user-form/user-form.component';
import { UsersTableComponent } from '../components/modules/sys-admin/users/users-table/users-table.component';
import { UsersHomeComponent } from '../components/modules/sys-admin/users/users-home/users-home.component';
import { ThemeComponent } from '../components/base/theme/theme-component';
import { MessagesModalComponent } from '../components/base/modals/messages/messages-modal.component';


import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';


import { WsAuthenticateService} from '../core/services/ws-authenticate/ws-authenticate.service';
import { LoadingService } from '../core/services/helpers/loading/loading.service';
import {WsAdministratorService} from '../core/services/ws-administrator/ws-administrator.service';
import { CompanyService } from '../core/services/helpers/company/company.service';
import { PrivilegyService } from '../core/services/helpers/privilegy/privilegy.service';
import { WsSysAdminService } from '../core/services/ws-sysAdmin/ws-sys-admin.service';
import { IdleServiceService } from '../core/services/helpers/idleService/idle-service.service';
import { UserLoggedServiceService } from '../core/services/helpers/userLoggedService/user-logged-service.service';
import { RouteService } from '../core/services/helpers/routeServices/route-services';

import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {  Utils } from '../core/util/utils';
import { NgFor } from '@angular/common';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ColorPickerModule } from 'ngx-color-picker';
import { DatePipe } from '@angular/common';
import { LocalizedDatePipe } from '../core/services/pipes/localizedDatePipe/localized-date-pipe';

import {  LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';
 registerLocaleData(localeEs,'es');



@NgModule({
  providers: [WsAuthenticateService,Utils,LoadingService,WsAdministratorService,BreadcrumbService,CompanyService
    ,PrivilegyService,WsSysAdminService, IdleServiceService, UserLoggedServiceService,RouteService,DatePipe,{ provide: LOCALE_ID, useValue: 'en-US' },LocalizedDatePipe],
  imports:      [ BrowserModule, ReactiveFormsModule,BreadcrumbModule, RouterModule , MaterialModule,
     BrowserAnimationsModule, NgbModule, AppRoutingModule,HttpClientModule,NgFor,ColorPickerModule
      ,NgbScrollSpyModule,FormsModule,NgIdleKeepaliveModule.forRoot(),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory : httpTranslateLoader,
      deps: [HttpClient]
    },
    

  }),  ReactiveFormsModule,NgbDatepickerModule
],
  declarations: [ AppComponent ,LoginFormComponent,HomeComponent,HeaderComponent,FooterComponent,LoadingComponent,
    MessagesComponent,CompanySelectorComponent,PhoneSelectorComponent,
    LenguageSelectorComponent,UserInfoComponent,MenuComponent,MenuMobileComponent,
    AdminComponent,AuditComponent,ContaComponent,CostSuccComponent,CustomerComponent,DirComponent,DoComponent
    ,FinanzasComponent,GestionComponent,HrComponent,InvComponent,MktComponent,OpComponent
    ,ProdComponent,PvComponent,SalesComponent,SupportComponent,SysAdminComponent,PurchComponent,
    BreadcrumbComponent,MainComponent, IdleModalComponent,UserFormComponent,MessagesModalComponent,
    UsersTableComponent,UsersHomeComponent,ThemeComponent,LocalizedDatePipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}

export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
} 
