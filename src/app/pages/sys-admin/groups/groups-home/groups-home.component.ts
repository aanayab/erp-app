import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoBean } from 'src/app/model/grupoBean';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups-home',
  templateUrl: './groups-home.component.html',
  styleUrls: ['./groups-home.component.css']
})
export class GroupsHomeComponent {

  Group!: GrupoBean;
  

constructor(private router:Router,private activatedRoute:ActivatedRoute,private groupService:GroupService){
  
  }
  
    getRouter(): Router {
      return this.router;
    }
  
    getActiveRouter(): ActivatedRoute {
       
      return this.activatedRoute;
    }
  
    editGroup(Group:GrupoBean){
      
      this.Group = Group;
      this.groupService.setGroup(Group); // Guarda el usuario en el servicio
      this.router.navigate(["EditGroup"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
    }

}