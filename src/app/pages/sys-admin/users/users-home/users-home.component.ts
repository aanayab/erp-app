import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { UserBean } from 'src/app/model/userBean';
import { UserService } from 'src/app/pages/sys-admin/users/services/user.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent {


 user!: UserBean;

constructor(private router:Router,private activatedRoute:ActivatedRoute,private userService:UserService){

}

  getRouter(): Router {
    return this.router;
  }

  getActiveRouter(): ActivatedRoute {
     
    return this.activatedRoute;
  }

  editUser(user:UserBean){
    
    this.user = user;
    this.userService.setUser(user); // Guarda el usuario en el servicio
    this.router.navigate(["EditUser"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
  }


}
