import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { HomeComponent } from '../components/home/home.component'
 
const routes: Routes = [
  {path : '' , redirectTo : '/' , pathMatch : 'full'},
  { path: '', component: LoginFormComponent },
  { path: 'home', component: HomeComponent },
  {path: '**' , component : LoginFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }