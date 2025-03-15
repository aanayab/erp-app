import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/core/util/utils';
import { IdleServiceService } from 'src/app/core/services/helpers/idleService/idle-service.service';
import { WsAuthenticateService } from 'src/app/core/services/ws-authenticate/ws-authenticate.service';


@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.css']
})
export class IdleModalComponent {

  constructor(public utils:Utils,public dialogRef: MatDialogRef<IdleModalComponent>
    ,@Inject(MAT_DIALOG_DATA) public component:any,public idleServiceService:IdleServiceService,
    private wsAuthenticateService:WsAuthenticateService) {}

  
  save(){
    // console.log(this.idleServiceService.idleState);
  }

}
