import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/core/util/utils';
import { IdleServiceService } from 'src/app/core/services/idleService/idle-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(public utils:Utils,public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public component:any,public idleServiceService:IdleServiceService ) {}

  
  save(){
    console.log(this.idleServiceService.idleState);
  }

}
