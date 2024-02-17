import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/core/model/alert';
import { MessageService } from 'src/app/core/services/message/message.service';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

 
	alert:Alert = {message:"", type:'',mostrar:false}; 
      constructor(private messageService:MessageService) { }


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
