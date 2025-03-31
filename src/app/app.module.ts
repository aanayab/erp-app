import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import {MessagesComponent} from './components/messages/messages.component';
import {HeaderComponent} from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'; 
import { LoadingComponent } from './components/loading/loading.component';
import { CompanySelectorComponent } from './components/company-selector/company-selector.component';
import { LenguageSelectorComponent } from './components/lenguage-selector/lenguage-selector.component';
import {UserInfoComponent} from './components/user-info/user-info-component'
import { MenuComponent } from './components/menu/menu.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { PhoneSelectorComponent } from './components/phone-selector/phone-selector.component';

import { AdminComponent } from './pages/admin/admin.component';
import { AuditComponent } from './pages/auditoria/auditoria.component';
import { ContaComponent } from './pages/contabilidad/contabilidad.component';
import { CostSuccComponent } from './pages/cost-succ/cost-succ.component';
import { CustomerComponent } from './pages/costumers/costumers.component';
import { DirComponent } from './pages/direccion/direccion.component';
import { DoComponent } from './pages/do/do.component';
import { FinanzasComponent } from './pages/finanzas/finanzas.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { HrComponent } from './pages/hr/hr.component';
import { InvComponent } from './pages/inventarios/inventarios.component';
import { MktComponent } from './pages/marketing/marketing.component';
import { OpComponent } from './pages/operaciones/operaciones.component';
import { ProdComponent } from './pages/produccion/produccion.component';
import { PvComponent } from './pages/punto-venta/punto-venta.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SupportComponent } from './pages/support/support.component';
import { SysAdminComponent } from './pages/sys-admin/sys-admin.component';
import { PurchComponent } from './pages/compras/compras.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MainComponent } from './pages/main/main.component';
import { IdleModalComponent } from './components/idle-modal/idle-modal.component';
import { UserFormComponent } from './pages/sys-admin/users/user-form/user-form.component';
import { UsersTableComponent } from './pages/sys-admin/users/users-table/users-table.component';
import { UsersHomeComponent } from './pages/sys-admin/users/users-home/users-home.component';
import { ThemeComponent } from './components/theme/theme-component';
import { MessagesModalComponent } from './components/modals/messages/messages-modal.component';
import { PasswordConfirmationComponent } from './pages/sys-admin/users/password-confirmation/password-confirmation.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';


import { WsAuthenticateService} from './services/ws-authenticate/ws-authenticate.service';
import { LoadingService } from './services/helpers/loading/loading.service';
import {WsAdministratorService} from './services/ws-administrator/ws-administrator.service';
import { CompanyService } from './services/helpers/company/company.service';
import { PrivilegyService } from './services/helpers/privilegy/privilegy.service';
import { WsSysAdminService } from './services/ws-sysAdmin/ws-sys-admin.service';
import { IdleServiceService } from './services/helpers/idleService/idle-service.service';
import { UserLoggedServiceService } from './services/helpers/userLoggedService/user-logged-service.service';
import { RouteService } from './services/helpers/routeServices/route-services';
import { ValidatorService } from './services/helpers/validator/validator.service';
import { WsSmsService } from './services/ws-sms/ws-sms.service';


import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {  Utils } from './util/utils';
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
import { LocalizedDatePipe } from './services/pipes/localizedDatePipe/localized-date-pipe';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';

import {  LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';
import {
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatButtonModule } from "@angular/material/button";
import { UserService } from './services/user/user.service';


 registerLocaleData(localeEs,'es');



@NgModule({
  providers: [WsAuthenticateService,Utils,LoadingService,WsAdministratorService,BreadcrumbService,CompanyService
    ,PrivilegyService,WsSysAdminService, IdleServiceService, UserLoggedServiceService,ValidatorService,
    WsSmsService,MatSnackBar,UserService,
    RouteService,DatePipe,{ provide: LOCALE_ID, useValue: 'en' },LocalizedDatePipe],
  imports: [MatButtonModule,MatSnackBarModule,BrowserModule, ReactiveFormsModule, BreadcrumbModule, RouterModule, MaterialModule,
    BrowserAnimationsModule, NgbModule, AppRoutingModule, HttpClientModule, NgFor, ColorPickerModule,
    NgbScrollSpyModule, FormsModule, NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
        },
    }), ReactiveFormsModule, NgbDatepickerModule, NgxCountriesDropdownModule],
  declarations: [ AppComponent ,LoginFormComponent,HomeComponent,HeaderComponent,FooterComponent,LoadingComponent,
    MessagesComponent,CompanySelectorComponent,PhoneSelectorComponent,
    LenguageSelectorComponent,UserInfoComponent,MenuComponent,MenuMobileComponent,
    AdminComponent,AuditComponent,ContaComponent,CostSuccComponent,CustomerComponent,DirComponent,DoComponent
    ,FinanzasComponent,GestionComponent,HrComponent,InvComponent,MktComponent,OpComponent
    ,ProdComponent,PvComponent,SalesComponent,SupportComponent,SysAdminComponent,PurchComponent,
    BreadcrumbComponent,MainComponent, IdleModalComponent,UserFormComponent,MessagesModalComponent
    ,PasswordConfirmationComponent,SnackBarComponent,
    UsersTableComponent,UsersHomeComponent,ThemeComponent,LocalizedDatePipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}

export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
} 
