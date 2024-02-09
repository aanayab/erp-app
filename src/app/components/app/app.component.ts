import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent  {

  

  // private unsubscribe = new Subject<void>();


  constructor(){ 
   
  }

  
  



  ngOnInit(): void {
   
  }


  open($event:Event) {
   console.log(event);
   
  }

}
