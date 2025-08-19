import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GrupoBean } from 'src/app/model/grupoBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsAuthenticateGroupService } from 'src/app/services/ws-authenticate/ws-authenticate.group.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.css']
})
export class GroupsTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<GrupoBean>;
  displayedColumns = ['idGrupo', 'grupo', 'disabled', 'edit', 'delete', 'Hide'];


  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    groups: GrupoBean[] | any;

    @Output() newItemEvent = new EventEmitter<GrupoBean>();
  
  
    constructor(private utils: Utils, private wsAuthenticateGroupService: WsAuthenticateGroupService,
      private router: Router, private translate: TranslateService, private companyService: CompanyService
      , private messageService: MessageService) {
  
  
    }
  
  
    borrar(group: GrupoBean) {
      let groupAux = group.idGrupo;
       
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateGroupService.deleteGroup(this.utils, groupAux,idCompany).subscribe(this.utils.subscribeHandler(this, () => {
        // Encuentra el índice del objeto.
        const index = this.groups.findIndex((group: any) => group.idGrupo === groupAux);
        if (index !== -1) {
          // Elimina el objeto en el índice encontrado.
          this.groups.splice(index, 1);
          this.dataSource.data = this.dataSource.data.filter(item => item.idGrupo !== group.idGrupo);
          const message =  this.translate.instant('GROUPS_TABLE.DELETE_MESSAGE', {
            grupo: group.grupo
          });
          this.messageService.showSuccessMessage(message);
        }
      }));
    }
  
  
    edit(group: GrupoBean) {
       
      this.newItemEvent.emit(group);
    }
  
    disable(group: GrupoBean) {
      group.enabled = !group.enabled;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateGroupService.disableEnableGroup(this.utils, group.idGrupo, group.enabled,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
    }
    hide(group: GrupoBean) {
      group.hidden = !group.hidden;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateGroupService.hideShowGroup(this.utils, group.idGrupo, group.hidden,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
    }
  
    ngOnInit() {
      this.getgroups();
    }
  
    addgroups() {
    }
  
    setgroups(component: any, result: GrupoBean[]) {
      component.groups = result;
      component.dataSource = new MatTableDataSource(result);
      component.dataSource.paginator = component.paginator;
      component.paginator._intl.itemsPerPageLabel = component.translate.instant('GROUPS_TABLE.ITEMS_PER_PAGE');
      component.paginator._intl.nextPageLabel = component.translate.instant('GROUPS_TABLE.NEXT_PAGE_LABEL');
      component.paginator._intl.previousPageLabel = component.translate.instant('GROUPS_TABLE.PREVIOUS_PAGE');
      component.dataSource.sort = component.sort;
  
    }
  
    getgroups() {
             
       this.companyService.getCompanyObs().subscribe(obs => {
         if (obs) {
        this.wsAuthenticateGroupService.getGroupsByIdCompany(this.utils, obs.idCompany)
          .subscribe(this.utils.subscribeHandler(this, this.setgroups)
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