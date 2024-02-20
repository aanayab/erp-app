import { Component,Input } from '@angular/core';
import { UserBean } from 'src/app/core/model/userBean';
import { Utils } from 'src/app/core/util/utils';
import { Router} from '@angular/router';

import {
  MatDialog,
} from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info-component';
import { UserLoggedServiceService } from 'src/app/core/services/userLoggedService/user-logged-service.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  userName?:string;
  @Input() user?:UserBean;  
  
  constructor(public dialog: MatDialog,private router: Router,private utils:Utils,private userLoggedServiceService:UserLoggedServiceService){
    

  }


  openDialog(userBean:any): void {
    this.dialog.open(UserInfoComponent, {
      data :userBean,
      width: '550px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      position:{top: '45px', right:'0px'}, 
      disableClose:true
    });
  }


  validateRoot(){    
  //  return this.utils.validateRoot();
    return true;
  }


  logOut(){
    this.utils.logOut();
  }



  ngOnInit() {
    
    this.userName = this.utils.getUsername();
     //this.getUser();
   }
 

  simpleAlert(){
    
  
//     Swal.fire({
//       position: 'top-end',
//       title: "<strong>HTml test</strong>",
//       icon: "info",
//       html: `
//       <form>
//   <div class="form-row">
//     <div class="col-md-12 mb-3">
//     <span>{{userBean | json}}<span>
//       <label for="validationServer01">First name</label>
//       <input type="text" class="form-control is-valid" id="validationServer01" placeholder="First name" value="Mark" required>
//       <div class="valid-feedback">
//         Looks good!
//       </div>
//     </div>
//     <div class="col-md-4 mb-3">
//       <label for="validationServer02">Last name</label>
//       <input type="text" class="form-control is-valid" id="validationServer02" placeholder="Last name" value="Otto" required>
//       <div class="valid-feedback">
//         Looks good!
//       </div>
//     </div>
//     <div class="col-md-4 mb-3">
//       <label for="validationServerUsername">Username</label>
//       <div class="input-group">
//         <div class="input-group-prepend">
//           <span class="input-group-text" id="inputGroupPrepend3">@</span>
//         </div>
//         <input type="text" class="form-control is-invalid" id="validationServerUsername" placeholder="Username" aria-describedby="inputGroupPrepend3" required>
//         <div class="invalid-feedback">
//           Please choose a username.
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="form-row">
//     <div class="col-md-6 mb-3">
//       <label for="validationServer03">City</label>
//       <input type="text" class="form-control is-invalid" id="validationServer03" placeholder="City" required>
//       <div class="invalid-feedback">
//         Please provide a valid city.
//       </div>
//     </div>
//     <div class="col-md-3 mb-3">
//       <label for="validationServer04">State</label>
//       <input type="text" class="form-control is-invalid" id="validationServer04" placeholder="State" required>
//       <div class="invalid-feedback">
//         Please provide a valid state.
//       </div>
//     </div>
//     <div class="col-md-3 mb-3">
//       <label for="validationServer05">Zip</label>
//       <input type="text" class="form-control is-invalid" id="validationServer05" placeholder="Zip" required>
//       <div class="invalid-feedback">
//         Please provide a valid zip.
//       </div>
//     </div>
//   </div>
//   <div class="form-group">
//     <div class="form-check">
//       <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required>
//       <label class="form-check-label" for="invalidCheck3">
//         Agree to terms and conditions
//       </label>
//       <div class="invalid-feedback">
//         You must agree before submitting.
//       </div>
//     </div>
//   </div>
//   <button class="btn btn-primary" type="submit">Submit form</button>
// </form>
//       `,
//       showCloseButton: false,
//       showCancelButton: false,
//       focusConfirm: false,
//       allowOutsideClick:false,
//       allowEscapeKey: false,
//       confirmButtonText: `
//         <i class="fa fa-thumbs-up"></i> Great!
//       `,
//       confirmButtonAriaLabel: "Thumbs up, great!",
//       cancelButtonText: `
//         <i class="fa fa-thumbs-down"></i>
//       `,
//       cancelButtonAriaLabel: "Thumbs down"
//     });

  }

}
