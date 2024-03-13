import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserBean } from 'src/app/core/model/userBean';
import { WsAuthenticateService } from 'src/app/core/services/ws-authenticate/ws-authenticate.service';
import { Utils } from 'src/app/core/util/utils';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UserComponent {

  user:UserBean | any;
}





