import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { UserBean } from 'src/app/core/model/userBean';
import { Utils } from 'src/app/core/util/utils';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-theme-component',
  templateUrl: './theme-component.html',
  styleUrls: ['./theme-component.css']
})
export class ThemeComponent {

  color: String | any;

  constructor(public utils: Utils, public dialogRef: MatDialogRef<ThemeComponent>, private formBuilder: FormBuilder) {

    let color = localStorage.getItem("ERPAPPCOLOR");
    if (color != undefined) {
      this.color = color;
    }else{
      this.color = " #fc0303";
    }

  }


  onSubmit() {

    localStorage.setItem("ERPAPPCOLOR", this.color);
    this.utils.changeTheme();

  }

  reset(): void {
    this.color = " #fc0303";
    this.utils.resetTheme();

  }
}

