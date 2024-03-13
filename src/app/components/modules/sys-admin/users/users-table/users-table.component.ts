import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UserBean } from 'src/app/core/model/userBean';
import { WsAuthenticateService } from 'src/app/core/services/ws-authenticate/ws-authenticate.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {

  
  displayedColumns: string[] = [ 'username', 'firstName', 'lastName','email','mobile','country','edit','delete'];
  dataSource!: MatTableDataSource<UserBean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users:UserBean[] | any;
  panelOpenState = true;
  @Input() user?: UserBean | any;


  constructor(private utils:Utils,private wsAuthenticateService:WsAuthenticateService,private router:Router) {
 
    }
 

  borrar(id:string){
    alert(id);
  }
  edit(user:UserBean){
    this.user = user;
   // this.router.navigate(['/userEdit']);
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
     component.dataSource.sort = component.sort;
    console.log(result)
  
  }

  getUsers() {
    this.wsAuthenticateService.getUsers(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setUsers)
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
