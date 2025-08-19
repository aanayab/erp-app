import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivilegyBean } from 'src/app/model/privilegyBean';
import { PrivilegyService } from '../services/privilegy.service';

@Component({
  selector: 'app-privilegies-home',
  templateUrl: './privilegies-home.component.html',
  styleUrls: ['./privilegies-home.component.css']
})
export class PrivilegiesHomeComponent {

  privilegy!: PrivilegyBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private privilegyService:PrivilegyService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editPrivilegy(privilegy:PrivilegyBean){
      
      this.privilegy = privilegy;
      this.privilegyService.setPrivilegy(privilegy); // Guarda el usuario en el servicio
      this.router.navigate(["EditPrivilegy"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}