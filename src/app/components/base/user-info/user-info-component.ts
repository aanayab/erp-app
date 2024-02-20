import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
    MatDialogRef,
} from '@angular/material/dialog';
import { UserBean } from 'src/app/core/model/userBean';
import { Utils } from 'src/app/core/util/utils';


@Component({
  selector: 'app-user-info-component',
  templateUrl: './user-info-component.html',
  styleUrls: ['./user-info-component.css']
})
export class UserInfoComponent {  

  constructor(public utils:Utils,public dialogRef: MatDialogRef<UserInfoComponent>,@Inject(MAT_DIALOG_DATA) public userBean:UserBean ) {}

  
  save(){
    console.log(this.userBean);
  }

  
}

