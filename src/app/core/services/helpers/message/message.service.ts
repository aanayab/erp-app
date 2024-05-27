import { Injectable } from '@angular/core';
import { Alert } from 'src/app/core/model/alert';
import { BehaviorSubject, Subject } from 'rxjs';


  

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  alertObject = new BehaviorSubject<Alert>({message:"", type:'',mostrar:false});
  alert$ = this.alertObject.asObservable();

  showSuccessMessage(message:string) {
    this.alertObject.next( {message,type: "success",mostrar:true});
  }

  showDarkMessage(message:string) {
    this.alertObject.next( {message,type: "dark",mostrar:true});
  }

  showLightMessage(message:string) {
    this.alertObject.next( {message,type: "light",mostrar:true});
  }

  showSecondaryMessage(message:string) {
    this.alertObject.next( {message,type: "secondary",mostrar:true});
  }

  showPrimaryMessage(message:string) {
    this.alertObject.next( {message,type: "primary",mostrar:true});
  }

  showDangerMessage(message:string) {
    this.alertObject.next( {message,type: "danger",mostrar:true});
  }

  showWarningMessage(message:string) {
    this.alertObject.next( {message,type: "warning",mostrar:true});
  }

  showinfoMessage(message:string) {
    this.alertObject.next( {message,type: "info",mostrar:true});
  }


  closeMessage() {
    this.alertObject.next( {message:"", type:'',mostrar:false});
  }



}
