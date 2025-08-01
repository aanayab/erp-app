import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionBean } from 'src/app/model/actionBean';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-actions-home',
  templateUrl: './actions-home.component.html',
  styleUrls: ['./actions-home.component.css']
})
export class ActionsHomeComponent {

  Action!: ActionBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private actionService:ActionService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editAction(Action:ActionBean){
      
      this.Action = Action;
      this.actionService.setAction(Action); // Guarda el usuario en el servicio
      this.router.navigate(["EditAction"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}