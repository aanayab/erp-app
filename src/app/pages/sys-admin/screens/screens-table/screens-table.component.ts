import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScreenBean } from 'src/app/model/screenBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsSysAdminScreenService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.screen.service';
import { Utils } from 'src/app/util/utils';



@Component({
  selector: 'app-screens-table',
  templateUrl: './screens-table.component.html',
  styleUrls: ['./screens-table.component.css']
})
export class ScreensTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<ScreenBean>;
  displayedColumns = ['idScreen', 'componente','path','disabled', 'edit', 'delete'];
  isOrderChanged = false;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  screens: ScreenBean[] | any;

  @Output() newItemEvent = new EventEmitter<ScreenBean>();


  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminScreenService,
    private router: Router, private translate: TranslateService, private companyService: CompanyService
    , private messageService: MessageService) {


  }


  borrar(screen: ScreenBean) {
    let screenAux = screen.idScreen;
    // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.deleteScreen(this.utils, screenAux).subscribe(this.utils.subscribeHandler(this, () => {
      // Encuentra el índice del objeto.
      const index = this.screens.findIndex((screen: any) => screen.screen === screenAux);
      if (index !== -1) {
        // Elimina el objeto en el índice encontrado.
        this.screens.splice(index, 1);
        this.dataSource.data = this.dataSource.data.filter(item => item.idScreen !== screen.idScreen);
        const message = this.translate.instant('SCREENS_TABLE.DELETE_MESSAGE', {
          idScreen: screen.idScreen
        });
        this.messageService.showSuccessMessage(message);
      }
    }));
  }


  edit(screen: ScreenBean) {
    debugger;
    this.newItemEvent.emit(screen);
  }

  disable(screen: ScreenBean) {
    screen.enabled = !screen.enabled;
    // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.disableEnableScreen(this.utils, screen.idScreen, screen.enabled).subscribe(this.utils.subscribeHandler(this, () => { }));
  }
  // hide(screen: ScreenBean) {
  //   screen.hidden = !screen.hidden;
  //   let idCompany = this.companyService.getCompany().idCompany;
  //   this.wsSysAdminService.hideShowScreen(this.utils, screen.screen, screen.hidden,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
  // }

  ngOnInit() {
    this.getScreens();
  }

  addScreens() {
  }

  setScreens(component: any, result: ScreenBean[]) {
    component.screens = result;
    component.dataSource = new MatTableDataSource(result);
    component.dataSource.paginator = component.paginator;
    component.paginator._intl.itemsPerPageLabel = component.translate.instant('SCREENS_TABLE.ITEMS_PER_PAGE');
    component.paginator._intl.nextPageLabel = component.translate.instant('SCREENS_TABLE.NEXT_PAGE_LABEL');
    component.paginator._intl.previousPageLabel = component.translate.instant('SCREENS_TABLE.PREVIOUS_PAGE');
    component.dataSource.sort = component.sort;

  }

  getScreens() {
    this.wsSysAdminService.getScreens(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setScreens)
      );
  }

  saveOrder():void{
    let screens = this.screens;
     // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.updateScreenSOrder(this.utils, screens).subscribe(this.utils.subscribeHandler(this, () => {
        const message = "Orden de las pantallas se actualizó correctamente."
        this.isOrderChanged = false;
        this.messageService.showSuccessMessage(message);
      
    }));

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
//   this.screens = this.dataSource.data.map(screen => ({ ...screen }));
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