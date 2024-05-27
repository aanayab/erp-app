import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { UserBean } from 'src/app/core/model/userBean';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent {


 user!: UserBean;

constructor(private router:Router,private activatedRoute:ActivatedRoute){

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
    this.router.navigate(["EditUser"], { relativeTo: this.activatedRoute });
  }


}
