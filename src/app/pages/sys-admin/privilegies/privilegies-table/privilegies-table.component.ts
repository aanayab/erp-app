import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrivilegyBean } from 'src/app/model/privilegyBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsSysAdminPrivilegyService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.privilegy.service';
import { Utils } from 'src/app/util/utils';



@Component({
  selector: 'app-privilegies-table',
  templateUrl: './privilegies-table.component.html',
  styleUrls: ['./privilegies-table.component.css']
})
export class PrivilegiesTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<PrivilegyBean>;
  displayedColumns = ['idPrivilegy', 'authority','idScreen','idAction','grupo','disabled', 'edit', 'delete'];
  isOrderChanged = false;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  privilegies: PrivilegyBean[] | any;

  @Output() newItemEvent = new EventEmitter<PrivilegyBean>();


  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminPrivilegyService,
    private router: Router, private translate: TranslateService, private companyService: CompanyService
    , private messageService: MessageService) {


  }


  borrar(privilegy: PrivilegyBean) {
     
    let privilegyAux = privilegy.idPrivilegy;
    // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.deletePrivilegy(this.utils, privilegyAux).subscribe(this.utils.subscribeHandler(this, () => {
      // Encuentra el índice del objeto.
      const index = this.privilegies.findIndex((privilegy: any) => privilegy.idPrivilegy === privilegyAux);
      if (index !== -1) {
        // Elimina el objeto en el índice encontrado.
        this.privilegies.splice(index, 1);
        this.dataSource.data = this.dataSource.data.filter(item => item.idPrivilegy !== privilegy.idPrivilegy);
        const message = this.translate.instant('PRIVILEGIES_TABLE.DELETE_MESSAGE', {
          idPrivilegy: privilegy.idPrivilegy
        });
        this.messageService.showSuccessMessage(message);
      }
    }));
  }


  edit(privilegy: PrivilegyBean) {
     
    this.newItemEvent.emit(privilegy);
  }

  disable(privilegy: PrivilegyBean) {
    privilegy.enabled = !privilegy.enabled;
    // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.disableEnablePrivilegy(this.utils, privilegy.idPrivilegy, privilegy.enabled).subscribe(this.utils.subscribeHandler(this, () => { }));
  }
  // hide(privilegy: PrivilegyBean) {
  //   privilegy.hidden = !privilegy.hidden;
  //   let idCompany = this.companyService.getCompany().idCompany;
  //   this.wsSysAdminService.hideShowPrivilegy(this.utils, privilegy.privilegy, privilegy.hidden,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
  // }

  ngOnInit() {
    this.getPrivilegies();
  }

  addPrivilegies() {
  }

  setPrivilegies(component: any, result: PrivilegyBean[]) {
     
    component.privilegies = result;
    component.dataSource = new MatTableDataSource(result);
    component.dataSource.paginator = component.paginator;
    component.paginator._intl.itemsPerPageLabel = component.translate.instant('PRIVILEGIES_TABLE.ITEMS_PER_PAGE');
    component.paginator._intl.nextPageLabel = component.translate.instant('PRIVILEGIES_TABLE.NEXT_PAGE_LABEL');
    component.paginator._intl.previousPageLabel = component.translate.instant('PRIVILEGIES_TABLE.PREVIOUS_PAGE');
    component.dataSource.sort = component.sort;

  }

  getPrivilegies() {
    this.wsSysAdminService.getPrivilegies(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setPrivilegies)
      );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//   drop(event: CdkDragDrop<any[]>) {
    
//   if (event.previousIndex === event.currentIndex) return;

//   const data = this.dataSource.data;
//   const draggedItem = data[event.previousIndex];

//   moveItemInArray(data, event.previousIndex, event.currentIndex);

//   this.recalculateOrderRespectingFixed(data, draggedItem);
//   this.dataSource.data = [...data]; // Forzar renderizado
//   this.isOrderChanged = true; // Habilita el botón de guardar
//   this.privilegies = this.dataSource.data.map(privilegy => ({ ...privilegy }));
//   this.messageService.showWarningMessage("Dar clik en el botón guardar para guardar el orden.")

// }


// recalculateOrderRespectingFixed(data: any[], movedItem: any): void {
//   let currentOrder = 1;

//   data.forEach(item => {
//     if (item.order < 999) {
//       // Reasignar secuencial
//       item.order = currentOrder++;
//     } else if (item === movedItem) {
//       // Fue movido manualmente: le damos el orden actual
//       item.order = currentOrder++;
//     }
//     // Si no es <999 ni fue movido, se conserva tal cual su order
//   });
// }


}