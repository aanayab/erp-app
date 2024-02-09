import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { HomeComponent } from '../components/home/home.component'
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
import { AppComponent } from '../components/app/app.component';

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
            { path: 'sysAdmin', component: SysAdminComponent, data: { breadcrumb: { alias: 'sysAdmin' } }, },
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