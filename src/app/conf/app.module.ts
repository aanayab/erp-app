import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../componets/app.component';
import { LoginFormComponent } from '../componets/login-form/login-form.component';
import { HomeComponent } from '../componets/home/home.component';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { WsAuthenticateService} from '../services/ws-authenticate.service';
import {  HttpClientModule } from '@angular/common/http';
import {  Utils } from '../services/util/utils';

@NgModule({
  providers: [WsAuthenticateService,Utils],
  imports:      [ BrowserModule, ReactiveFormsModule, RouterModule , MaterialModule, BrowserAnimationsModule, NgbModule, AppRoutingModule,HttpClientModule ],
  declarations: [ AppComponent, LoginFormComponent,HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}
