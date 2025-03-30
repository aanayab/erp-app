import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../components/base/login-form/login-form.component';
import { HomeComponent } from '../components/base/home/home.component'
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
import { AppComponent } from '../components/app/app.component';
import { UserFormComponent } from '../components/modules/sys-admin/users/user-form/user-form.component';
import { UsersHomeComponent } from '../components/modules/sys-admin/users/users-home/users-home.component';
import { PasswordConfirmationComponent } from '../components/modules/sys-admin/users/password-confirmation/password-confirmation.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: "",
    component: AppComponent,
    children: [
      { path: "", redirectTo: "Login", pathMatch: "full" },
      { path: 'Login', component: LoginFormComponent, data: { breadcrumb: { skip: true } } },
      { path: 'confirmation', component: PasswordConfirmationComponent, data: { breadcrumb: { skip: true } } },
      { path: 'pLogin', component: LoginFormComponent, data: { breadcrumb: { skip: true } } },
      {
        path: 'Home', component: HomeComponent, data: { breadcrumb: { alias: 'BREADCRUMP.HOME' } }, children:
          [
            { path: 'Admin', component: AdminComponent, data: { breadcrumb: { alias: 'BREADCRUMP.ADMINISTRATOR' } }, },
            { path: 'Audit', component: AuditComponent, data: { breadcrumb: { alias: 'BREADCRUMP.AUDITORY' } }, },
            { path: 'Conta', component: ContaComponent, data: { breadcrumb: { alias: 'BREADCRUMP.CONTABILITY' } }, },
            { path: 'CostSucc', component: CostSuccComponent, data: { breadcrumb: { alias: 'BREADCRUMP.COSTUMER_SUCCESS' } }, },
            { path: 'Costumer', component: CustomerComponent, data: { breadcrumb: { alias: 'BREADCRUMP.COSTUMER' } }, },
            { path: 'Dir', component: DirComponent, data: { breadcrumb: { alias: 'BREADCRUMP.DIRECTION' } }, },
            { path: 'Do', component: DoComponent, data: { breadcrumb: { alias: 'BREADCRUMP.DO' } }, },
            { path: 'Finanzas', component: FinanzasComponent, data: { breadcrumb: { alias: 'BREADCRUMP.FINANCE' } }, },
            { path: 'Gestion', component: GestionComponent, data: { breadcrumb: { alias: 'BREADCRUMP.MANAGEMENT' } }, },
            { path: 'Hr', component: HrComponent, data: { breadcrumb: { alias: 'BREADCRUMP.HR' } }, },
            { path: 'Inv', component: InvComponent, data: { breadcrumb: { alias: 'BREADCRUMP.INVENTORY' } }, },
            { path: 'Mkt', component: MktComponent, data: { breadcrumb: { alias: 'BREADCRUMP.MARKETING' } }, },
            { path: 'Op', component: OpComponent, data: { breadcrumb: { alias: 'BREADCRUMP.OPERATIONS' } }, },
            { path: 'Prod', component: ProdComponent, data: { breadcrumb: { alias: 'BREADCRUMP.PRODUCTIONS' } }, },
            { path: 'Pv', component: PvComponent, data: { breadcrumb: { alias: 'BREADCRUMP.SALES_POINT' } }, },
            { path: 'Sales', component: SalesComponent, data: { breadcrumb: { alias: 'BREADCRUMP.SALES' } }, },
            { path: 'Support', component: SupportComponent, data: { breadcrumb: { alias: 'BREADCRUMP.SUPPORT' } }, },
            { path: 'purch', component: PurchComponent, data: { breadcrumb: { alias: 'BREADCRUMP.PURCHASING' } }, },
             { path: 'SysAdmin', component: SysAdminComponent, data: { breadcrumb: { alias: 'BREADCRUMP.SYSTEM_ADMINISTRATOR' } }, children:[
              //  { path: 'Users', redirectTo: 'Users/Main',pathMatch: "full" },
               { path: 'Users', component: UsersHomeComponent, data: { breadcrumb: { alias: 'BREADCRUMP.USERS' } }, children:[
                //  { path: 'Main', component: UsersHomeComponent, data: { breadcrumb: { alias: 'UserMain' } }, },
                 { path: 'EditUser', component: UserFormComponent, data: { breadcrumb: { alias: 'BREADCRUMP.EDIT_USER' } }, },
                 { path: 'AddUser', component: UserFormComponent, data: { breadcrumb: { alias: 'BREADCRUMP.ADD_USER' } }, },
  
               ] },
             ] },
         
          ]
      },
    ]
  },
  { path: '**', component: LoginFormComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }