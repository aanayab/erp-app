import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CompanyBean } from 'src/app/model/companyBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { WsSysAdminCompanyService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.company.service';
import { Utils } from 'src/app/util/utils';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent {
  panelOpenState = true;
  dataSource!: MatTableDataSource<CompanyBean>;
  
  displayedColumns: string[] = [
  'idCompany',
  'legalName',
  'commercialName',
  'rfc',
  'countryCodeIso3',
  'currency',
  'contactName',
  'email',
  'industry',
  'websiteUrl',
  'disabled',
  'edit',
  'delete'
];

  isOrderChanged = false;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  companies: CompanyBean[] | any;

  @Output() newItemEvent = new EventEmitter<CompanyBean>();


  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminCompanyService,
    private router: Router, private translate: TranslateService, private companyService: CompanyService
    , private messageService: MessageService) {


  }


  borrar(company: CompanyBean) {
    let companyAux = company.idCompany;
    // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.deleteCompany(this.utils, companyAux).subscribe(this.utils.subscribeHandler(this, () => {
      // Encuentra el índice del objeto.
      const index = this.companies.findIndex((company: any) => company.idCompany === companyAux);
      if (index !== -1) {
        // Elimina el objeto en el índice encontrado.
        this.companies.splice(index, 1);
        this.dataSource.data = this.dataSource.data.filter(item => item.idCompany !== company.idCompany);
        const message = this.translate.instant('COMPANIES_TABLE.DELETE_MESSAGE', {
          commercialName: company.commercialName
        });
        this.messageService.showSuccessMessage(message);
      }
    }));
  }


  edit(company: CompanyBean) {
     
    this.newItemEvent.emit(company);
  }

  disable(company: CompanyBean) {
    company.enabled = !company.enabled;
    // let idCompany = this.companyService.getCompany().idCompany;
    this.wsSysAdminService.disableEnableCompany(this.utils, company.idCompany, company.enabled).subscribe(this.utils.subscribeHandler(this, () => { }));
  }
  // hide(company: CompanyBean) {
  //   company.hidden = !company.hidden;
  //   let idCompany = this.companyService.getCompany().idCompany;
  //   this.wsSysAdminService.hideShowCompany(this.utils, company.company, company.hidden,idCompany).subscribe(this.utils.subscribeHandler(this, () => { }));
  // }

  ngOnInit() {
    this.getCompanies();
  }

  addCompanies() {
  }

  setCompanies(component: any, result: CompanyBean[]) {
    component.companies = result;
    component.dataSource = new MatTableDataSource(result);
    component.dataSource.paginator = component.paginator;
    component.paginator._intl.itemsPerPageLabel = component.translate.instant('COMPANIES_TABLE.ITEMS_PER_PAGE');
    component.paginator._intl.nextPageLabel = component.translate.instant('COMPANIES_TABLE.NEXT_PAGE_LABEL');
    component.paginator._intl.previousPageLabel = component.translate.instant('COMPANIES_TABLE.PREVIOUS_PAGE');
    component.dataSource.sort = component.sort;

  }

  getCompanies() {
    this.wsSysAdminService.getCompanies3(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setCompanies)
      );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 




}