import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { UserBean } from 'src/app/model/userBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsAuthenticateService } from 'src/app/services/ws-authenticate/ws-authenticate.authority.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<AuthorityBean>;
  displayedColumns = ['select','authority', 'description'];


  selection = new SelectionModel<any>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    authorities: AuthorityBean[]= [];

    @Input() selectedAuthorities: AuthorityBean[] | any = [];

    @Output() selectedAuthoritiesChange = new EventEmitter<AuthorityBean[]>();

    @Output() newItemEvent = new EventEmitter<AuthorityBean>();


  
  
    constructor(private utils: Utils, private wsAuthenticateService: WsAuthenticateService,
      private router: Router, private translate: TranslateService, private companyService: CompanyService
      , private messageService: MessageService,private fb: FormBuilder) {
  
  
    }
  
  
    borrar(authority: AuthorityBean) {
      let authorityAux = authority.authority;
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
      this.dataSource = new MatTableDataSource<AuthorityBean>([]);
      this.getAuthorities();
    }
  
    addAuthorities() {
    }
  
    emitSelectedAuthorities() {
      this.selectedAuthoritiesChange.emit(this.selection.selected);
    }
    setAuthorities(component: any, result: AuthorityBean[]) {
      component.authorities = result;
      component.dataSource = new MatTableDataSource(result);
      component.dataSource.paginator = component.paginator;
      component.paginator._intl.itemsPerPageLabel = component.translate.instant('ROLES_TABLE.ITEMS_PER_PAGE');
      component.paginator._intl.nextPageLabel = component.translate.instant('ROLES_TABLE.NEXT_PAGE_LABEL');
      component.paginator._intl.previousPageLabel = component.translate.instant('ROLES_TABLE.PREVIOUS_PAGE');
      component.dataSource.sort = component.sort;
    
      
  // ✅ Inicializar selección aquí
  component.initSelection();
  
    }

  
    getAuthorities() {
             
      this, this.companyService.getCompanyObs().subscribe(obs => {
        this.wsAuthenticateService.getAuthoritiesByIdCompany(this.utils, obs.idCompany)
          .subscribe(this.utils.subscribeHandler(this, this.setAuthorities)
          );
        });
   
  
    }

    initSelection() {
      if (!this.selectedAuthorities?.length || !this.authorities?.length) {
        return;
      }
    
      const preselected = this.authorities.filter(auth =>
        this.selectedAuthorities.some((sel:AuthorityBean) => sel.authority === auth.authority)
      );
    
      this.selection = new SelectionModel<AuthorityBean>(true, preselected);
    }
    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }



isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

isSomeSelected() {
  const numSelected = this.selection.selected.length;
  return numSelected > 0 && !this.isAllSelected();
}

toggleAllRows(event: any) {
  if (event.checked) {
    this.selection.select(...this.dataSource.data);
  } else {
    this.selection.clear();
  }
}

toggleSelection(row: any) {
  this.selection.toggle(row);
}
}
