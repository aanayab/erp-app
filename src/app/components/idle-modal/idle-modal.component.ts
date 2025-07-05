import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/util/utils';
import { IdleServiceService } from 'src/app/services/helpers/idleService/idle-service.service';
import { WsAuthenticateUserService } from 'src/app/services/ws-authenticate/ws-authenticate.user.service';


@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.css']
})
export class IdleModalComponent {

  constructor(public utils:Utils,public dialogRef: MatDialogRef<IdleModalComponent>
    ,@Inject(MAT_DIALOG_DATA) public component:any,public idleServiceService:IdleServiceService,
    private wsAuthenticateService:WsAuthenticateUserService) {}



}
