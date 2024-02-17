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
import {UserComponent} from '../components/base/user/user-component'
import { MenuComponent } from '../components/base/menu/menu.component';
import { MenuMobileComponent } from '../components/base/menu-mobile/menu-mobile.component';

import { AdminComponent } from '../components/modules/admin/admin.component';
import { AuditoriaComponent } from '../components/modules/auditoria/auditoria.component';
import { ContabilidadComponent } from '../components/modules/contabilidad/contabilidad.component';
import { CostSuccComponent } from '../components/modules/cost-succ/cost-succ.component';
import { CostumersComponent } from '../components/modules/costumers/costumers.component';
import { DireccionComponent } from '../components/modules/direccion/direccion.component';
import { DoComponent } from '../components/modules/do/do.component';
import { FinanzasComponent } from '../components/modules/finanzas/finanzas.component';
import { GestionComponent } from '../components/modules/gestion/gestion.component';
import { HrComponent } from '../components/modules/hr/hr.component';
import { InventariosComponent } from '../components/modules/inventarios/inventarios.component';
import { MarketingComponent } from '../components/modules/marketing/marketing.component';
import { OperacionesComponent } from '../components/modules/operaciones/operaciones.component';
import { ProduccionComponent } from '../components/modules/produccion/produccion.component';
import { PuntoVentaComponent } from '../components/modules/punto-venta/punto-venta.component';
import { SalesComponent } from '../components/modules/sales/sales.component';
import { SupportComponent } from '../components/modules/support/support.component';
import { SysAdminComponent } from '../components/modules/sys-admin/sys-admin.component';
import { ComprasComponent } from '../components/modules/compras/compras.component';
import { BreadcrumbComponent } from '../components/base/breadcrumb/breadcrumb.component';
import { MainComponent } from '../components/modules/main/main.component';
import { ModalComponent } from '../components/base/modal/modal/modal.component';


import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { Sweetalert2Module } from  './sweetalert2/sweetalert2.module'


import { WsAuthenticateService} from '../core/services/ws-authenticate/ws-authenticate.service';
import { LoadingService } from '../core/services/loading/loading.service';
import {WsAdministratorService} from '../core/services/ws-administrator/ws-administrator.service';
import { CompanyService } from '../core/services/company/company.service';
import { PrivilegyService } from '../core/services/privilegy/privilegy.service';
import { WsSysAdminService } from '../core/services/ws-sysAdmin/ws-sys-admin.service';
import { IdleServiceService } from '../core/services/idleService/idle-service.service';
import { UserLoggedServiceService } from '../core/services/userLoggedService/user-logged-service.service';

import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {  Utils } from '../core/util/utils';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbService } from 'xng-breadcrumb';


@NgModule({
  providers: [WsAuthenticateService,Utils,LoadingService,WsAdministratorService,BreadcrumbService,CompanyService
    ,PrivilegyService,WsSysAdminService, IdleServiceService, UserLoggedServiceService],
  imports:      [ BrowserModule, ReactiveFormsModule,BreadcrumbModule, RouterModule , MaterialModule,
     BrowserAnimationsModule, NgbModule, AppRoutingModule,HttpClientModule,Sweetalert2Module,NgFor,
      NgbAlertModule,NgbScrollSpyModule,FormsModule,NgIdleKeepaliveModule.forRoot(),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory : httpTranslateLoader,
      deps: [HttpClient]
    },
    

  })],
  declarations: [ AppComponent ,LoginFormComponent,HomeComponent,HeaderComponent,FooterComponent,LoadingComponent,
    MessagesComponent,CompanySelectorComponent,LenguageSelectorComponent,UserComponent,MenuComponent,MenuMobileComponent,
    AdminComponent,AuditoriaComponent,ContabilidadComponent,CostSuccComponent,CostumersComponent,DireccionComponent,DoComponent
    ,FinanzasComponent,GestionComponent,HrComponent,InventariosComponent,MarketingComponent,OperacionesComponent
    ,ProduccionComponent,PuntoVentaComponent,SalesComponent,SupportComponent,SysAdminComponent,ComprasComponent,
    BreadcrumbComponent,MainComponent, ModalComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}

export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
} 
