import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';


import { AppComponent } from '../components/app/app.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { HomeComponent } from '../components/home/home.component';
import { RouterModule } from '@angular/router';
import {MessagesComponent} from '../components/messages/messages.component';
import {HeaderComponent} from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component'; 
import { LoadingComponent } from '../components/loading/loading.component';
import { CompanySelectorComponent } from '../components/company-selector/company-selector.component';
import { LenguageSelectorComponent } from '../components/lenguage-selector/lenguage-selector.component';
import {UserComponent} from '../components/user/user-component'
import { MenuComponent } from '../components/menu/menu.component';
import { MenuMobileComponent } from '../components/menu-mobile/menu-mobile.component';

import { AdminComponent } from '../components/admin/admin/admin.component';
import { AuditoriaComponent } from '../components/auditoria/auditoria/auditoria.component';
import { ContabilidadComponent } from '../components/contabilidad/contabilidad/contabilidad.component';
import { CostSuccComponent } from '../components/cost-succ/cost-succ/cost-succ.component';
import { CostumersComponent } from '../components/costumers/costumers/costumers.component';
import { DireccionComponent } from '../components/direccion/direccion/direccion.component';
import { DoComponent } from '../components/do/do/do.component';
import { FinanzasComponent } from '../components/finanzas/finanzas/finanzas.component';
import { GestionComponent } from '../components/gestion/gestion/gestion.component';
import { HrComponent } from '../components/hr/hr/hr.component';
import { InventariosComponent } from '../components/inventarios/inventarios/inventarios.component';
import { MarketingComponent } from '../components/marketing/marketing/marketing.component';
import { OperacionesComponent } from '../components/operaciones/operaciones/operaciones.component';
import { ProduccionComponent } from '../components/produccion/produccion/produccion.component';
import { PuntoVentaComponent } from '../components/puntoVenta/punto-venta/punto-venta.component';
import { SalesComponent } from '../components/sales/sales/sales.component';
import { SupportComponent } from '../components/support/support/support.component';
import { SysAdminComponent } from '../components/sys-admin/sys-admin/sys-admin.component';
import { ComprasComponent } from '../components/compras/compras/compras.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { MainComponent } from '../components/main/main.component';


import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { Sweetalert2Module } from  './sweetalert2/sweetalert2.module'


import { WsAuthenticateService} from '../services/ws-authenticate/ws-authenticate.service';
import { LoadingService } from '../services/loading/loading.service';
import {WsAdministratorService} from '../services/ws-administrator/ws-administrator.service';
import { CompanyService } from '../services/company/company.service';
import { PrivilegyService } from '../services/privilegy/privilegy.service';
import { WsSysAdminService } from '../services/ws-sysAdmin/ws-sys-admin.service';

import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {  Utils } from '../services/util/utils';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbModule} from 'xng-breadcrumb';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbService } from 'xng-breadcrumb';


@NgModule({
  providers: [WsAuthenticateService,Utils,LoadingService,WsAdministratorService,BreadcrumbService,CompanyService,PrivilegyService,WsSysAdminService],
  imports:      [ BrowserModule, ReactiveFormsModule,BreadcrumbModule, RouterModule , MaterialModule, BrowserAnimationsModule, NgbModule, AppRoutingModule,HttpClientModule,Sweetalert2Module,NgFor, NgbAlertModule,NgbScrollSpyModule,FormsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory : httpTranslateLoader,
      deps: [HttpClient]
    }

  })],
  declarations: [ AppComponent ,LoginFormComponent,HomeComponent,HeaderComponent,FooterComponent,LoadingComponent,
    MessagesComponent,CompanySelectorComponent,LenguageSelectorComponent,UserComponent,MenuComponent,MenuMobileComponent,
    AdminComponent,AuditoriaComponent,ContabilidadComponent,CostSuccComponent,CostumersComponent,DireccionComponent,DoComponent
    ,FinanzasComponent,GestionComponent,HrComponent,InventariosComponent,MarketingComponent,OperacionesComponent
    ,ProduccionComponent,PuntoVentaComponent,SalesComponent,SupportComponent,SysAdminComponent,ComprasComponent,
    BreadcrumbComponent,MainComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}

export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
} 
