import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { UserBean } from 'src/app/core/model/userBean';
import { UserService } from 'src/app/core/services/user/user.service';

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
    // console.log(this.router);
    return this.router;
  }

  getActiveRouter(): ActivatedRoute {
     
    // console.log(this.activatedRoute);
    return this.activatedRoute;
  }

  editUser(user:UserBean){
    
    this.user = user;
    this.userService.setUser(user); // Guarda el usuario en el servicio
    this.router.navigate(["EditUser"], { relativeTo: this.activatedRoute, queryParams: { mode: 'edit' }  });
  }


}
