
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {



  constructor(
    private breadcrumbService: BreadcrumbService,
     private translate:TranslateService
  ) { }
  
  ngOnInit(): void {
    // this.breadcrumbService.set('@admin', 'Administrador');
    // this.breadcrumbService.set('@audit', 'Auditoria');
    // this.breadcrumbService.set('@conta', 'Contabilidad');
    // this.breadcrumbService.set('@costSucc', 'Servicio al cliente');
    // this.breadcrumbService.set('@costumer', 'Clientes');
    // this.breadcrumbService.set('@dir', 'Dirección');
    // this.breadcrumbService.set('@do', 'Desarrollo Organizacional');
    // this.breadcrumbService.set('@finanzas', 'Finanzas');
    // this.breadcrumbService.set('@gestion', 'Gestión');

    // this.breadcrumbService.set('@hr', 'Recursos Humanos');
    // this.breadcrumbService.set('@inv', 'Inventarios');
    // this.breadcrumbService.set('@mkt', 'Mercadotecnia');
    // this.breadcrumbService.set('@op', 'Operaciones');
    // this.breadcrumbService.set('@prod', 'Producción');
    // this.breadcrumbService.set('@pv', 'Punto de Venta');
    // this.breadcrumbService.set('@sales', 'Ventas');
    // this.breadcrumbService.set('@support', 'Soporte');
    //  this.breadcrumbService.set('@sysAdmin', 'BREADCRUMP.SYSTEM_ADMINISTRATOR');
    // this.breadcrumbService.set('@purch', 'Compras'); 
    // this.breadcrumbService.set('@home', 'Home');        

  }

}
