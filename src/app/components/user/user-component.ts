import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
    MatDialogRef,
} from '@angular/material/dialog';
import { UserBean } from 'src/app/model/userBean';
import { Utils } from 'src/app/services/util/utils';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.html',
  styleUrls: ['./user-component.css']
})
export class UserComponent {  

  constructor(public utils:Utils,public dialogRef: MatDialogRef<UserComponent>,@Inject(MAT_DIALOG_DATA) public userBean:UserBean ) {}

  
  save(){
    console.log(this.userBean);
  }

  
}

