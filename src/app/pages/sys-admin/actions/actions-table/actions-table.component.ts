import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActionBean } from 'src/app/model/actionBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsSysAdminActionService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.action.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.css']
})
export class ActionsTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<ActionBean>;
  displayedColumns = ['idAction', 'action', 'disabled', 'edit', 'delete'];


  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    actions: ActionBean[] | any;

    @Output() newItemEvent = new EventEmitter<ActionBean>();
  
  
    constructor(private utils: Utils, private wsSysAdminActionService: WsSysAdminActionService,
      private router: Router, private translate: TranslateService, private companyService: CompanyService
      , private messageService: MessageService) {
  
  
    }
  
  
    borrar(action: ActionBean) {
      let actionAux = action.idAction;
       
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminActionService.deleteAction(this.utils, actionAux).subscribe(this.utils.subscribeHandler(this, () => {
        // Encuentra el índice del objeto.
        const index = this.actions.findIndex((action: any) => action.idAction === actionAux);
        if (index !== -1) {
          // Elimina el objeto en el índice encontrado.
          this.actions.splice(index, 1);
          this.dataSource.data = this.dataSource.data.filter(item => item.idAction !== action.idAction);
          const message =  this.translate.instant('ACTIONS_TABLE.DELETE_MESSAGE', {
            action: action.action
          });
          this.messageService.showSuccessMessage(message);
        }
      }));
    }
  
  
    edit(action: ActionBean) {
       
      this.newItemEvent.emit(action);
    }
  
    disable(action: ActionBean) {
      action.enabled = !action.enabled;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsSysAdminActionService.disableEnableAction(this.utils, action.idAction, action.enabled).subscribe(this.utils.subscribeHandler(this, () => { }));
    }
  
    ngOnInit() {
      this.getactions();
    }
  
    addactions() {
    }
  
    setactions(component: any, result: ActionBean[]) {
      component.actions = result;
      component.dataSource = new MatTableDataSource(result);
      component.dataSource.paginator = component.paginator;
      component.paginator._intl.itemsPerPageLabel = component.translate.instant('ACTIONS_TABLE.ITEMS_PER_PAGE');
      component.paginator._intl.nextPageLabel = component.translate.instant('ACTIONS_TABLE.NEXT_PAGE_LABEL');
      component.paginator._intl.previousPageLabel = component.translate.instant('ACTIONS_TABLE.PREVIOUS_PAGE');
      component.dataSource.sort = component.sort;
  
    }
  
    getactions() {
             
       this.companyService.getCompanyObs().subscribe(obs => {
         if (obs) {
        this.wsSysAdminActionService.getActions(this.utils)
          .subscribe(this.utils.subscribeHandler(this, this.setactions)
          );
        }
        });
   
  
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}