import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenBean } from 'src/app/model/screenBean';
import { ScreenService } from '../services/screen.service';

@Component({
  selector: 'app-screens-home',
  templateUrl: './screens-home.component.html',
  styleUrls: ['./screens-home.component.css']
})
export class ScreensHomeComponent {

  screen!: ScreenBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private screenService:ScreenService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editScreen(screen:ScreenBean){
      
      this.screen = screen;
      this.screenService.setScreen(screen); // Guarda el usuario en el servicio
      this.router.navigate(["EditScreen"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}