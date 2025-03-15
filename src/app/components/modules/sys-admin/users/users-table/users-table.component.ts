import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserBean } from 'src/app/core/model/userBean';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { WsAuthenticateService } from 'src/app/core/services/ws-authenticate/ws-authenticate.service';
import { Utils } from 'src/app/core/util/utils';
import { Output, EventEmitter } from '@angular/core';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {


  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'mobile', 'country', 'disabled', 'edit', 'delete', 'Hide'];
  dataSource!: MatTableDataSource<UserBean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users: UserBean[] | any;
  panelOpenState = true;
  @Output() newItemEvent = new EventEmitter<UserBean>();
  // @Output() user?: UserBean | any;


  constructor(private utils: Utils, private wsAuthenticateService: WsAuthenticateService,
    private router: Router, private translate: TranslateService, private companyService: CompanyService
    , private messageService: MessageService) {


  }


  borrar(user: UserBean) {
    let username = user.username;
    this.wsAuthenticateService.deleteUser(this.utils, username).subscribe(this.utils.subscribeHandler(this, () => {
      // Encuentra el índice del objeto.
      const index = this.users.findIndex((user: any) => user.username === username);
      if (index !== -1) {
        // Elimina el objeto en el índice encontrado.
        this.users.splice(index, 1);
        this.dataSource.data = this.dataSource.data.filter(item => item.username !== user.username);
        this.messageService.showSuccessMessage("El usuario " + username + " se eliminó correctamente.");
      }
    }));
  }


  edit(user: UserBean) {
    
    this.newItemEvent.emit(user);
  }

  disable(user: UserBean) {
    user.enabled = !user.enabled;
    // if(user.enabled === 1){
    //   user.enabled = 0;
    //   enabled = false;
    // }else{
    //   user.enabled = 1;
    //   enabled = true;
    // }

    this.wsAuthenticateService.disableEnableUser(this.utils, user.username, user.enabled).subscribe(this.utils.subscribeHandler(this, () => { }));
  }
  hide(user: UserBean) {
    user.hidden = !user.hidden;
    // if(user.hidden === 1){
    //   user.hidden = 0;
    // }else{
    //   user.hidden = 1;
    // }
    this.wsAuthenticateService.hideShowUser(this.utils, user.username, user.hidden).subscribe(this.utils.subscribeHandler(this, () => { }));
    // this.router.navigate(['/UserEdit']);
  }

  ngOnInit() {
    this.getUsers();
  }

  addUser() {
  }

  setUsers(component: any, result: UserBean[]) {
    component.users = result;
    component.dataSource = new MatTableDataSource(result);
    component.dataSource.paginator = component.paginator;
    component.paginator._intl.itemsPerPageLabel = component.translate.instant('ITEMS_PER_PAGE');
    component.paginator._intl.nextPageLabel = component.translate.instant('NEXT_PAGE_LABEL');
    component.paginator._intl.previousPageLabel = component.translate.instant('PREVIOUS_PAGE');
    component.dataSource.sort = component.sort;
    // console.log(result)

  }

  getUsers() {
    
    this, this.companyService.getCompanyObs().subscribe(obs => {
      
      this.wsAuthenticateService.getUsersByIdCompany(this.utils, obs.idCompany)
        .subscribe(this.utils.subscribeHandler(this, this.setUsers)
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
