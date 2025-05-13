import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { AuthorityService } from '../services/authority.service';

@Component({
  selector: 'app-roles-home',
  templateUrl: './roles-home.component.html',
  styleUrls: ['./roles-home.component.css']
})
export class RolesHomeComponent {

  authority!: AuthorityBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private authoriryService:AuthorityService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editAuthority(authority:AuthorityBean){
      
      this.authority = authority;
      this.authoriryService.setAuthority(authority); // Guarda el usuario en el servicio
      this.router.navigate(["EditRole"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}