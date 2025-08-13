import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuBean } from 'src/app/model/menuBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsSysAdminMenuService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.menu.service';
import { Utils } from 'src/app/util/utils';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-menus-table',
  templateUrl: './menus-table.component.html',
  styleUrls: ['./menus-table.component.css']
})
export class MenusTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<MenuBean>;
  displayedColumns = ['position','order','idMenu','name', 'idScreen','idParentMenu','disabled', 'edit', 'delete'];
  isOrderChanged = false;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  menus: MenuBean[] | any;

  @Output() newItemEvent = new EventEmitter<MenuBean>();


  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminMenuService,
    private router: Router, private translate: TranslateService, private companyService: CompanyService
    , private messageService: MessageService) {


  }


    borrar(menu: MenuBean) {
      let menuAux = menu.idMenu;
      debugger;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminService.deleteMenu(this.utils, menuAux).subscribe(this.utils.subscribeHandler(this, () => {
        // Encuentra el índice del objeto.
        const index = this.menus.findIndex((menu: any) => menu.idMenu === menuAux);
        if (index !== -1) {
          // Elimina el objeto en el índice encontrado.
          this.menus.splice(index, 1);
          this.dataSource.data = this.dataSource.data.filter(item => item.idMenu !== menu.idMenu);
          const message =  this.translate.instant('MENUS_TABLE.DELETE_MESSAGE', {
            idMenu: menu.name
          });
          this.messageService.showSuccessMessage(message);
        }
      }));
    }


  edit(menu: MenuBean) {
    debugger;
    this.newItemEvent.emit(menu);
  }

 disable(menu: MenuBean) {
      menu.enabled = !menu.enabled;
      this.wsSysAdminService.disableEnableMenu(this.utils, menu.idMenu, menu.enabled).subscribe(this.utils.subscribeHandler(this, () => { }));
    }

  ngOnInit() {
    this.getMenus();
  }

  addMenus() {
  }

  setMenus(component: any, result: MenuBean[]) {
    component.menus = result;
    component.dataSource = new MatTableDataSource(result);
    component.dataSource.paginator = component.paginator;
    component.paginator._intl.itemsPerPageLabel = component.translate.instant('MENUS_TABLE.ITEMS_PER_PAGE');
    component.paginator._intl.nextPageLabel = component.translate.instant('MENUS_TABLE.NEXT_PAGE_LABEL');
    component.paginator._intl.previousPageLabel = component.translate.instant('MENUS_TABLE.PREVIOUS_PAGE');
    component.dataSource.sort = component.sort;

  }

  getMenus() {
    this.wsSysAdminService.getMenus(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setMenus)
      );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    saveOrder():void{
    let menus = this.menus;
     // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.updateMenuOrder(this.utils, menus).subscribe(this.utils.subscribeHandler(this, () => {
        const message = "Orden de las pantallas se actualizó correctamente."
        this.isOrderChanged = false;
        this.messageService.showSuccessMessage(message);
      
    }));

  }

    drop(event: CdkDragDrop<any[]>) {
    
  if (event.previousIndex === event.currentIndex) return;

  const data = this.dataSource.data;
  const draggedItem = data[event.previousIndex];

  moveItemInArray(data, event.previousIndex, event.currentIndex);

  this.recalculateOrderRespectingFixed(data, draggedItem);
  this.dataSource.data = [...data]; // Forzar renderizado
  this.isOrderChanged = true; // Habilita el botón de guardar
  this.menus = this.dataSource.data.map(menu => ({ ...menu }));
  this.messageService.showWarningMessage("Dar clik en el botón guardar para guardar el orden.")

}


recalculateOrderRespectingFixed(data: any[], movedItem: any): void {
  let currentOrder = 1;

  data.forEach(item => {
    if (item.order < 999) {
      // Reasignar secuencial
      item.order = currentOrder++;
    } else if (item === movedItem) {
      // Fue movido manualmente: le damos el orden actual
      item.order = currentOrder++;
    }
    // Si no es <999 ni fue movido, se conserva tal cual su order
  });
}





}