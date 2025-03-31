import { Component, inject } from "@angular/core";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Alert } from "src/app/model/alert";
import { MessageService } from "src/app/services/helpers/message/message.service";

@Component({
    selector: 'app-snack-bar',
    templateUrl: 'snack-bar.component.html',
    styleUrls: ['./snack-bar.component.css' ],
  })
  export class SnackBarComponent {

    alert:Alert = {message:"", type:'',mostrar:false}; 
    snackBarRef = inject(MatSnackBarRef);

    constructor(private messageService:MessageService , private translate:TranslateService) { }


    ngOnInit(): void {
      this.messageService.alert$.subscribe((alert:Alert) => {
        this.alert = alert;
      });
    }

    close(){
      this.alert = {message:"", type:'',mostrar:false}; 
     this.messageService.closeMessage();
    }
  
  }