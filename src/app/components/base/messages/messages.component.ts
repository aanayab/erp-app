import { Component, OnInit, inject } from '@angular/core';
import { Alert } from 'src/app/core/model/alert';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
	alert:Alert = {message:"", type:'',mostrar:false}; 
      constructor(private messageService:MessageService,private _snackBar: MatSnackBar  , private translate:TranslateService) { }


  ngOnInit(): void {
    this.messageService.alert$.subscribe((alert:Alert) => {
      this.alert = alert;
      if(alert.mostrar){
      this.openSnackBar(alert);
      }
    });
  }
  

  close(){
    this.alert = {message:"", type:'',mostrar:false}; 
   this.messageService.closeMessage();
   this._snackBar.dismiss();
  }

  // openTopSnackBar(alert:Alert) {
  //   this._snackBar.open( this.translate.instant(alert.message), 'Close', {
  //     horizontalPosition: "center",
  //     verticalPosition: "top",
  //     duration: this.durationInSeconds * 1000,

  //   });
  // }

  mostrarSnackbar(tipo: string) {

  }
  
  openSnackBar(alert:Alert) {
    let clase: string;

    switch (alert.type) {
      case 'info':
        clase = 'custom-snackbar-info';
        break;
      case 'secondary':
        clase = 'custom-snackbar-secondary';
        break;
      case 'primary':
        clase = 'custom-snackbar-primary';
        break;
      case 'success':
        clase = 'custom-snackbar-success';
        break;
      case 'danger':
        clase = 'custom-snackbar-danger';
        break;
      case 'warning':
        clase = 'custom-snackbar-warning';
        break;
      case 'light':
        clase = 'custom-snackbar-light';
        break;
      case 'dark':
        clase = 'custom-snackbar-dark';
        break;
      default:
        clase = 'custom-snackbar-info'; // Clase por defecto
        break;
    }
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 10000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: [clase],

      
    });
  }

  }
