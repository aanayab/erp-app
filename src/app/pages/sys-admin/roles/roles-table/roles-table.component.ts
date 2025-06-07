import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsAuthenticateService } from 'src/app/services/ws-authenticate/ws-authenticate.authority.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.css']
})
export class RolesTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<AuthorityBean>;
  displayedColumns = ['authority', 'description', 'disabled', 'edit', 'delete', 'Hide'];


  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    authorities: AuthorityBean[] | any;

    @Output() newItemEvent = new EventEmitter<AuthorityBean>();
  
  
    constructor(private utils: Utils, private wsAuthenticateService: WsAuthenticateService,
      private router: Router, private translate: TranslateService, private companyService: CompanyService
      , private messageService: MessageService) {
  
  
    }
  
  
    borrar(authority: AuthorityBean) {
      let authorityAux = authority.authority;
      debugger;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateService.deleteAuthority(this.utils, authorityAux,idCompany).subscribe(this.utils.subscribeHandler(this, () => {
        // Encuentra el índice del objeto.
        const index = this.authorities.findIndex((authority: any) => authority.authority === authorityAux);
        if (index !== -1) {
          // Elimina el objeto en el índice encontrado.
          this.authorities.splice(index, 1);
          this.dataSource.data = this.dataSource.data.filter(item => item.authority !== authority.authority);
          const message =  this.translate.instant('ROLES_TABLE.DELETE_MESSAGE', {
            authority: authorityAux
          });
          this.messageService.showSuccessMessage(message);
        }
      }));
    }
  
  
    edit(authority: AuthorityBean) {
      debugger;
      this.newItemEvent.emit(authority);
    }
  
    disable(authority: AuthorityBean) {
      authority.enabled = !authority.enabled;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateService.disableEnableAuthority(this.utils, authority.authority, authority.enabled,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
    }
    hide(authority: AuthorityBean) {
      authority.hidden = !authority.hidden;
      let idCompany = this.companyService.getCompany().idCompany;
      this.wsAuthenticateService.hideShowAuthority(this.utils, authority.authority, authority.hidden,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
    }
  
    ngOnInit() {
      this.getAuthorities();
    }
  
    addAuthorities() {
    }
  
    setAuthorities(component: any, result: AuthorityBean[]) {
      component.authorities = result;
      component.dataSource = new MatTableDataSource(result);
      component.dataSource.paginator = component.paginator;
      component.paginator._intl.itemsPerPageLabel = component.translate.instant('ROLES_TABLE.ITEMS_PER_PAGE');
      component.paginator._intl.nextPageLabel = component.translate.instant('ROLES_TABLE.NEXT_PAGE_LABEL');
      component.paginator._intl.previousPageLabel = component.translate.instant('ROLES_TABLE.PREVIOUS_PAGE');
      component.dataSource.sort = component.sort;
  
    }
  
    getAuthorities() {
             
      this, this.companyService.getCompanyObs().subscribe(obs => {
        this.wsAuthenticateService.getAuthoritiesByIdCompany(this.utils, obs.idCompany)
          .subscribe(this.utils.subscribeHandler(this, this.setAuthorities)
          );
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