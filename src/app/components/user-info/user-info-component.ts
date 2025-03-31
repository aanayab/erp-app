import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
    MatDialogRef,
} from '@angular/material/dialog';
import { UserBean } from 'src/app/model/userBean';
import { Utils } from 'src/app/util/utils';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-user-info-component',
  templateUrl: './user-info-component.html',
  styleUrls: ['./user-info-component.css']
})
export class UserInfoComponent {  

  constructor(public utils:Utils,public dialogRef: MatDialogRef<UserInfoComponent>,@Inject(MAT_DIALOG_DATA) public userBean:UserBean,private formBuilder: FormBuilder ) {}


  userInfoForm = this.formBuilder.group({
    firstName: [{value: this.userBean.firstName, disabled: true}, Validators.required],
    lastName: [{value: this.userBean.lastName, disabled: true},Validators.required],
    email: [{value:this.userBean.email, disabled: true},Validators.required],
    mobile: [{value:this.userBean.mobile, disabled: true},Validators.required],
    country: [{value:this.userBean.countryCode, disabled: true},Validators.required],
  
  });  

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.userInfoForm.value);
  }
   
}

