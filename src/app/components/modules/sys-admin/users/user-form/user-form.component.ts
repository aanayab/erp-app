import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormControl, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserBean } from 'src/app/core/model/userBean';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { WsAuthenticateService } from 'src/app/core/services/ws-authenticate/ws-authenticate.service';
import { Utils } from 'src/app/core/util/utils';
import { DatePipe } from '@angular/common';
import { LanguageServiceService } from 'src/app/core/services/helpers/languageService/language-service.service';
import { LocalizedDatePipe } from 'src/app/core/services/pipes/localizedDatePipe/localized-date-pipe';
import { Router } from '@angular/router';


  

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  
  
  panelOpenState = true;
  @Input() user: UserBean | any;
   userInfoForm = this.formBuilder.group({
          username: [{value: '', disabled: false}, Validators.required],
          accountVerified: [{value: false, disabled: true}, Validators.required],
          createAt: [{value: this.datePipe.transform(new Date(),'shortDate')  , disabled: true}, Validators.required],
          enabled: [{value: false,disabled: true}, Validators.required],
          failedLoginAttempts: [{value: 0, disabled: true}, Validators.required],
          firstName: [{value: '', disabled: false}, Validators.required],
          lastModif: [{value:  this.datePipe.transform(new Date(),'shortDate'), disabled: true},Validators.required],
          lastName: [{value: '', disabled: false},Validators.required],
          mfaEnabled : [{value:false, disabled: true},Validators.required],
          email: [{value:'',disabled: false},Validators.required],
          mobile: [{value:'',disabled: false},Validators.required],
          password: [{value:'', disabled: true},Validators.required],
          secret: [{value:'',disabled: true},Validators.required],
          token : [{value:'',disabled: true},Validators.required],
          country: [{value:'',disabled: false},Validators.required],
          idCompany: [{value:this.companyService.getCompany().idCompany,disabled: false},Validators.required],
          hidden: [{value:false,disabled: false},Validators.required],
        
        });  

   validEmail = true;   
   today: Date = new Date();  
   type:any;
   message:any;
 


  constructor(private formBuilder: FormBuilder, private companyService:CompanyService,private wsAuthenticateService:WsAuthenticateService, private utils:Utils,private datePipe: LocalizedDatePipe
    ,private languageServiceService:LanguageServiceService, private router:Router ) {
   
  }


  ngOnInit() {
    
    if(this.user !== undefined){
      this.userInfoForm.setValue(this.user);
    }
}

  getUserName(email:any){
    
    this.userInfoForm.patchValue({
      username: email.userInfoForm.value.email.split("@")[0],

    });

  }

  exist(component:any, result:any ){
    
    this.validEmail = result;
    console.log(component, result);

  }
 
  existUsername(){
    let username = this.userInfoForm.value.username;
    if(username !== undefined && username !== ""){
      this.wsAuthenticateService.existUsername(username,this.utils).subscribe(this.utils.subscribeHandler(this,this.exist));

    }
   
  }

  existEmail(){
    let email = this.userInfoForm.value.email;
    if(email !== undefined && email !== ""){
      this.wsAuthenticateService.existEmail(email,this.utils).subscribe(this.utils.subscribeHandler(this,this.exist));

    }
  }


  closeAction(){
    
    this.router.navigate(['users']); 
  }

 

  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value   
    let user: UserBean | any = this.userInfoForm.value;
         user.idCompany =  this.companyService.getCompany().idCompany;
      // this.wsAuthenticateService.addUsers(this.utils,user).subscribe(this.utils.subscribeHandler(this,() =>{
      //   this.type = 'success';
      //   this.message =  `Se ha mandado un correo de confirmación al correo ${user.email} para finalizar el alta del usuario ${user.username}.`;
      //   let element = document.getElementById("modalSuccess") as HTMLElement;
      //   element.click();

      //   // 
      //  }));

;


    console.log(this.user);
  }

  getCompany(){
    return this.companyService.getCompany().name;
  }
  

  // updateName() {
  //   this.name.setValue('Nancy');
  // }

  updateProfile() {
    this.userInfoForm.patchValue({
      firstName: 'Nancy',

    });
  }

}
