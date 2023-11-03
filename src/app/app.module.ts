import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, RouterModule , MaterialModule, BrowserAnimationsModule, NgbModule, AppRoutingModule],
  declarations: [ AppComponent, LoginFormComponent,HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}
