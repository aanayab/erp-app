import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuBean } from 'src/app/model/menuBean';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menus-home',
  templateUrl: './menus-home.component.html',
  styleUrls: ['./menus-home.component.css']
})
export class MenusHomeComponent {

  menu!: MenuBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private menuService:MenuService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editMenu(menu:MenuBean){
      
      this.menu = menu;
      this.menuService.setMenu(menu); // Guarda el usuario en el servicio
      this.router.navigate(["EditMenu"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}