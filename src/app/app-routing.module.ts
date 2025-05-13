import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component'
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
import { AppComponent } from './app.component';
import { UserFormComponent } from './pages/sys-admin/users/user-form/user-form.component';
import { UsersHomeComponent } from './pages/sys-admin/users/users-home/users-home.component';
import { PasswordConfirmationComponent } from './pages/sys-admin/users/password-confirmation/password-confirmation.component';
import { RolesHomeComponent } from './pages/sys-admin/roles/roles-home/roles-home.component';
import { RoleFormComponent } from './pages/sys-admin/roles/role-form/role-form.component';


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
               { path: 'Roles', component: RolesHomeComponent, data: { breadcrumb: { alias: 'BREADCRUMP.ROLES' } }, children:[
                //  { path: 'Main', component: UsersHomeComponent, data: { breadcrumb: { alias: 'UserMain' } }, },
                 { path: 'EditRole', component: RoleFormComponent, data: { breadcrumb: { alias: 'BREADCRUMP.EDIT_ROLE' } }, },
                 { path: 'AddRole', component: RoleFormComponent, data: { breadcrumb: { alias: 'BREADCRUMP.ADD_ROLE' } }, },
  
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