import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { IConfig, ICountry } from 'ngx-countries-dropdown';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';


  

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  
  

  selectedCountryConfig: IConfig = {
    hideCode: false,
    hideName: false
    
  };
  countryListConfig:  IConfig = {
    hideCode: false,
    hideName: false
    
  };

  // selectedCountryConfig: IConfig = {
  //   hideFlag: true,
  //   hideCode: true,
  //   hideName: true,
  //   hideSearch: true,
  //   hideDialCode: true,
  //   displayCapital: true,
  //   displayLanguageCode: true,
  //   displayLanguageName: true,
  //   displayCurrencyCode: true,
  //   displayCurrencyName: true,
  //   displayCurrencySymbol: true,
  // };
  // countryListConfig: IConfig = {
  //   hideFlag: true,
  //   hideCode: true,
  //   hideName: true,
  //   hideSearch: true,
  //   hideDialCode: true,
  //   displayCapital: true,
  //   displayLanguageCode: true,
  //   displayLanguageName: true,
  //   displayCurrencyCode: true,
  //   displayCurrencyName: true,
  //   displayCurrencySymbol: true,

  // };
  country: ICountry | any;
  panelOpenState = true;
  @Input() user: UserBean | any;
   userInfoForm = this.formBuilder.group({
          username: [{value: '', disabled: false}, Validators.required],
          // accountVerified: [{value: false, disabled: true}, Validators.required],
          createAt: [{value: this.datePipe.transform(new Date(),'shortDate')  , disabled: true}, Validators.required],
          enabled: [{value: false,disabled: true}, Validators.required],
          // failedLoginAttempts: [{value: 0, disabled: true}, Validators.required],
          firstName: [{value: '', disabled: false}, Validators.required],
          lastModif: [{value:  this.datePipe.transform(new Date(),'shortDate'), disabled: true},Validators.required],
          lastName: [{value: '', disabled: false},Validators.required],
          // mfaEnabled : [{value:false, disabled: true},Validators.required],
          email: [{value:'',disabled: false},[Validators.required,Validators.email]],
          mobile: [{value:'',disabled: false},Validators.required,this.phoneValidator],
          // password: [{value:'', disabled: true},Validators.required],
          // secret: [{value:'',disabled: true},Validators.required],
          // token : [{value:'',disabled: true},Validators.required],
          // country: [{value:'',disabled: false},Validators.required],
          // idCompany: [{value:this.companyService.getCompany().idCompany,disabled: false},Validators.required],
          hidden: [{value:false,disabled: false},Validators.required],
        
        });  

   existEmailFlag = false;   
   existUsernameFlag= false;   
   today: Date = new Date();  
   type:any;
   message:any;
 


  constructor(private formBuilder: FormBuilder, private companyService:CompanyService,private wsAuthenticateService:WsAuthenticateService, private utils:Utils,private datePipe: LocalizedDatePipe
    ,private languageServiceService:LanguageServiceService, 
    private router:Router,private messageService:MessageService, private translate:TranslateService
    ,private route: ActivatedRoute ) {
   
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

  phoneValidator(control: AbstractControl): 
  Observable<ValidationErrors | null> {
    const valid = /^\d{10}$/.test(control.value); 
    return of(valid ? null : { invalidPhone: true });
    // Emit null, to indicate no error occurred.
   
  }

  validEmail(component:any, result:any ){
    component.existEmailFlag = result;
    component.existUsername();

  }
 
  validUsername(component:any, result:any ){
    component.existUsernameFlag = result;

  }
 

  existUsername(){
    let username = this.userInfoForm.value.username;
    if(username !== undefined && username !== ""){
      this.wsAuthenticateService.existUsername(username,this.utils).subscribe(this.utils.subscribeHandler(this,this.validUsername));

    }
   
  }

  existEmail(){
    let email = this.userInfoForm.value.email;
    if(email !== undefined && email !== ""){
      this.wsAuthenticateService.existEmail(email,this.utils).subscribe(this.utils.subscribeHandler(this,this.validEmail));

    }
  }


  closeAction(){    
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCountryChange(country: any) {
    this.country = country;

  } 



  onSubmit() {
    // TODO: Use EventEmitter with form value   
    
    if(this.existEmailFlag){
      this.messageService.showDangerMessage("email:exist");
      return; 
    }
    if(this.existUsernameFlag){
      this.messageService.showDangerMessage("username:exist");
      return; 
    }

    let user: UserBean | any = this.userInfoForm.value;
    let country = this.country;
    if(country == undefined){
      this.messageService.showDangerMessage("country:required");
      return;
    }
    if(!this.userInfoForm.valid){
      this.messageService.showDangerMessage(this.userInfoForm.status);
      return;
    }
    if(this.companyService.getCompany().idCompany === undefined){
      this.messageService.showDangerMessage("company:required");
      return;
    }
    
         user.idCompany =  this.companyService.getCompany().idCompany;
         user.countryCode = country.code;
         const phoneNumberWithCountryCode = this.country.dialling_code +user.mobile;
         user.mobile = phoneNumberWithCountryCode;
      this.wsAuthenticateService.addUsers(this.utils,user).subscribe(this.utils.subscribeHandler(this,() =>{
      this.type = 'success';
      this.message =  this.translate.instant('CONFIRMATION_EMAIL', {
        email: user.email,
        username: user.username
      });
      //   this.message =  `Se ha mandado un correo de confirmación al correo ${user.email} para finalizar el alta del usuario ${user.username}.`;
         let element = document.getElementById("modalSuccess") as HTMLElement;
         element.click();

      //   // 
       }));

;


    console.log(user);
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
