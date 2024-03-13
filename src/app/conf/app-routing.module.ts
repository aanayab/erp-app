import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../components/modules/login-form/login-form.component';
import { HomeComponent } from '../components/base/home/home.component'
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
import { AppComponent } from '../components/app/app.component';
import { UserComponent } from '../components/modules/sys-admin/users/users/users.component';
import { UserFormComponent } from '../components/modules/sys-admin/users/user-form/user-form.component';
import { UsersTableComponent } from '../components/modules/sys-admin/users/users-table/users-table.component';
import { UsersHomeComponent } from '../components/modules/sys-admin/users/users-home/users-home.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: "",
    component: AppComponent,
    children: [
       { path: "", redirectTo: "home", pathMatch: "full" },
      { path: 'login', component: LoginFormComponent, data: { breadcrumb: { skip: true } } },
      {
        path: 'home', component: HomeComponent, data: { breadcrumb: { alias: 'home' } }, children:
          [
            { path: 'admin', component: AdminComponent, data: { breadcrumb: { alias: 'admin' } }, },
            { path: 'audit', component: AuditoriaComponent, data: { breadcrumb: { alias: 'audit' } }, },
            { path: 'conta', component: ContabilidadComponent, data: { breadcrumb: { alias: 'conta' } }, },
            { path: 'costSucc', component: CostSuccComponent, data: { breadcrumb: { alias: 'costSucc' } }, },
            { path: 'costumer', component: CostumersComponent, data: { breadcrumb: { alias: 'Costumer' } }, },
            { path: 'dir', component: DireccionComponent, data: { breadcrumb: { alias: 'dir' } }, },
            { path: 'do', component: DoComponent, data: { breadcrumb: { alias: 'do' } }, },
            { path: 'finanzas', component: FinanzasComponent, data: { breadcrumb: { alias: 'finanzas' } }, },
            { path: 'gestion', component: GestionComponent, data: { breadcrumb: { alias: 'esgtion' } }, },
            { path: 'hr', component: HrComponent, data: { breadcrumb: { alias: 'hr' } }, },
            { path: 'inv', component: InventariosComponent, data: { breadcrumb: { alias: 'inv' } }, },
            { path: 'mkt', component: MarketingComponent, data: { breadcrumb: { alias: 'mkt' } }, },
            { path: 'op', component: OperacionesComponent, data: { breadcrumb: { alias: 'op' } }, },
            { path: 'prod', component: ProduccionComponent, data: { breadcrumb: { alias: 'prod' } }, },
            { path: 'pv', component: PuntoVentaComponent, data: { breadcrumb: { alias: 'pv' } }, },
            { path: 'sales', component: SalesComponent, data: { breadcrumb: { alias: 'sales' } }, },
            { path: 'support', component: SupportComponent, data: { breadcrumb: { alias: 'support' } }, },
            { path: 'sysAdmin', component: SysAdminComponent, data: { breadcrumb: { alias: 'sysAdmin' } }, children:[
              { path: 'users', redirectTo: 'users/main',pathMatch: "full" },
              { path: 'users', component: UserComponent, data: { breadcrumb: { alias: 'users' } }, children:[
                { path: 'main', component: UsersHomeComponent, data: { breadcrumb: { alias: 'userMain' } }, },
                { path: 'editUser', component: UserFormComponent, data: { breadcrumb: { alias: 'editUser' } }, },
                { path: 'addUser', component: UserFormComponent, data: { breadcrumb: { alias: 'addUser' } }, },
  
              ] },

            ] },
            { path: 'purch', component: ComprasComponent, data: { breadcrumb: { alias: 'purch' } }, },
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