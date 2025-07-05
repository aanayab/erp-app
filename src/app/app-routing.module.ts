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
import { ScreensHomeComponent } from './pages/sys-admin/screens/screens-home/screens-home.component';
import { ScreensTableComponent } from './pages/sys-admin/screens/screens-table/screens-table.component';
import { ScreenFormComponent } from './pages/sys-admin/screens/screen-form/screen-form.component';


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
        path: 'Home', component: HomeComponent, data: { breadcrumb:  'BREADCRUMP.HOME'  }, children:
          [
            { path: 'Admin', component: AdminComponent, data: { breadcrumb:  'BREADCRUMP.ADMINISTRATOR'  }, },
            { path: 'Audit', component: AuditComponent, data: { breadcrumb:  'BREADCRUMP.AUDITORY'  }, },
            { path: 'Conta', component: ContaComponent, data: { breadcrumb:  'BREADCRUMP.CONTABILITY'  }, },
            { path: 'CostSucc', component: CostSuccComponent, data: { breadcrumb:  'BREADCRUMP.COSTUMER_SUCCESS'  }, },
            { path: 'Costumer', component: CustomerComponent, data: { breadcrumb:  'BREADCRUMP.COSTUMER'  }, },
            { path: 'Dir', component: DirComponent, data: { breadcrumb:  'BREADCRUMP.DIRECTION'  }, },
            { path: 'Do', component: DoComponent, data: { breadcrumb:  'BREADCRUMP.DO'  }, },
            { path: 'Finanzas', component: FinanzasComponent, data: { breadcrumb:  'BREADCRUMP.FINANCE'  }, },
            { path: 'Gestion', component: GestionComponent, data: { breadcrumb:  'BREADCRUMP.MANAGEMENT'  }, },
            { path: 'Hr', component: HrComponent, data: { breadcrumb:  'BREADCRUMP.HR'  }, },
            { path: 'Inv', component: InvComponent, data: { breadcrumb:  'BREADCRUMP.INVENTORY'  }, },
            { path: 'Mkt', component: MktComponent, data: { breadcrumb:  'BREADCRUMP.MARKETING'  }, },
            { path: 'Op', component: OpComponent, data: { breadcrumb:  'BREADCRUMP.OPERATIONS'  }, },
            { path: 'Prod', component: ProdComponent, data: { breadcrumb:  'BREADCRUMP.PRODUCTIONS'  }, },
            { path: 'Pv', component: PvComponent, data: { breadcrumb:  'BREADCRUMP.SALES_POINT'  }, },
            { path: 'Sales', component: SalesComponent, data: { breadcrumb:  'BREADCRUMP.SALES'  }, },
            { path: 'Support', component: SupportComponent, data: { breadcrumb:  'BREADCRUMP.SUPPORT'  }, },
            { path: 'purch', component: PurchComponent, data: { breadcrumb:  'BREADCRUMP.PURCHASING'  }, },
             { path: 'SysAdmin', component: SysAdminComponent, data: { breadcrumb:  'BREADCRUMP.SYSTEM_ADMINISTRATOR'  }, children:[
              //  { path: 'Users', redirectTo: 'Users/Main',pathMatch: "full" },
               { path: 'Users', component: UsersHomeComponent, data: { breadcrumb:  'BREADCRUMP.USERS'  }, children:[
                //  { path: 'Main', component: UsersHomeComponent, data: { breadcrumb:  'UserMain' } }, },
                 { path: 'EditUser', component: UserFormComponent, data: { breadcrumb:  'BREADCRUMP.EDIT_USER'  }, },
                 { path: 'AddUser', component: UserFormComponent, data: { breadcrumb:  'BREADCRUMP.ADD_USER'  }, },
  
               ] },
               { path: 'Roles', component: RolesHomeComponent, data: { breadcrumb:  'BREADCRUMP.ROLES'  }, children:[
                //  { path: 'Main', component: UsersHomeComponent, data: { breadcrumb:  'UserMain' } }, },
                 { path: 'EditRole', component: RoleFormComponent, data: { breadcrumb:  'BREADCRUMP.EDIT_ROLE'  }, },
                 { path: 'AddRole', component: RoleFormComponent, data: { breadcrumb:  'BREADCRUMP.ADD_ROLE'  }, },
  
               ] },
                { path: 'Screens', component: ScreensHomeComponent, data: { breadcrumb:  'BREADCRUMP.SCREENS'  }, children:[
                //  { path: 'Main', component: UsersHomeComponent, data: { breadcrumb:  'UserMain' } }, },
                 { path: 'EditScreen', component: ScreenFormComponent, data: { breadcrumb:  'BREADCRUMP.EDIT_SCREEN'  }, },
                 { path: 'AddScreen', component: ScreenFormComponent, data: { breadcrumb:  'BREADCRUMP.ADD_SCREEN'  }, },
  
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