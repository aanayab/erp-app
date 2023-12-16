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

import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { Sweetalert2Module } from  './sweetalert2/sweetalert2.module'

import { WsAuthenticateService} from '../services/ws-authenticate/ws-authenticate.service';
import { LoadingService } from '../services/loading/loading.service';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {  Utils } from '../services/util/utils';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  providers: [WsAuthenticateService,Utils,LoadingService],
  imports:      [ BrowserModule, ReactiveFormsModule, RouterModule , MaterialModule, BrowserAnimationsModule, NgbModule, AppRoutingModule,HttpClientModule,Sweetalert2Module,NgFor, NgbAlertModule,NgbScrollSpyModule,FormsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory : httpTranslateLoader,
      deps: [HttpClient]
    }

  })],
  declarations: [ AppComponent, LoginFormComponent,HomeComponent,HeaderComponent,FooterComponent,LoadingComponent,MessagesComponent,CompanySelectorComponent,LenguageSelectorComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}

export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
} 
