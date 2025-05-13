import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserBean } from 'src/app/model/userBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsAuthenticateService } from 'src/app/services/ws-authenticate/ws-authenticate.user.service';
import { Utils } from 'src/app/util/utils';
import { LanguageServiceService } from 'src/app/services/helpers/languageService/language-service.service';
import { LocalizedDatePipe } from 'src/app/services/pipes/localizedDatePipe/localized-date-pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfig, ICountry } from 'ngx-countries-dropdown';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/pages/sys-admin/users/services/user.service';
import { CountryService } from 'ngx-countries-dropdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';




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
  countryListConfig: IConfig = {
    hideCode: false,
    hideName: false

  };


  country: ICountry | any;
  panelOpenState = true;
  @Input() user: UserBean | any;
  userInfoForm = this.formBuilder.group({
    username: [{ value: '', disabled: false }, Validators.required],
    createAt: [{ value: new Date(), disabled: false }, Validators.required],
    enabled: [{ value: false, disabled: true }, Validators.required],
    firstName: [{ value: '', disabled: false }, Validators.required],
    lastModif: [{ value: new Date(), disabled: false }, Validators.required],
    lastName: [{ value: '', disabled: false }, Validators.required],
    email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
    mobile: [{ value: '', disabled: false }, Validators.required, this.phoneValidator], 
    hidden: [{ value: false, disabled: false }, Validators.required],
    lastModifUser: [{value:this.userLoggedServiceService.getUserName(), disabled: false }, Validators.required],
    createUser: [{value:this.userLoggedServiceService.getUserName() , disabled: false }, Validators.required]

  });

  existEmailFlag = false;
  existMobileFlag = false;
  existUsernameFlag = false;
  private intervalo: any;
  type: any;
  message: any;
  mode: string = 'add'; // Por defecto, modo agregar


  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private wsAuthenticateService: WsAuthenticateService, private utils: Utils,public datePipe: LocalizedDatePipe
    , private languageServiceService: LanguageServiceService,
    private router: Router, private messageService: MessageService, private translate: TranslateService
    , private route: ActivatedRoute, private userService: UserService, private countryService: CountryService,
    private snackBar: MatSnackBar,private userLoggedServiceService:UserLoggedServiceService) {

  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add'; // Detecta si es "edit" o "add"

      if (this.mode === 'edit') {
        this.user = this.userService.getUser();
      } else {
        this.userService.clearUser(); // Limpia el usuario en modo agregar
        this.actualizarHora();
        this.intervalo = setInterval(() => {
          this.actualizarHora();
        }, 1000);
      }

      if (this.user) {
        this.userInfoForm.patchValue({
          username: this.user.username,
          createAt:this.user.createAt,
          enabled: this.user.enabled,
          firstName: this.user.firstName,
          lastModif: this.user.lastModif,
          lastName: this.user.lastName,
          email: this.user.email,
          mobile: this.user.mobile,
          hidden: this.user.hidden,
          createUser:this.user.createUser,
          lastModifUser: this.user.lastModifUser,
        });
        debugger;
        this.country = this.countryService.getAllCountries().find(c => c.code === this.user.countryCode);
        this.userInfoForm.get('username')?.disable({ emitEvent: false });
        this.userInfoForm.get('email')?.disable({ emitEvent: false });
        this.userInfoForm.get('mobile')?.disable({ emitEvent: false });
        this.userInfoForm.get('enabled')?.enable({ emitEvent: false });
        if(this.user.accountLocked){
          this.userInfoForm.get('firstName')?.disable({ emitEvent: false });
          this.userInfoForm.get('lastName')?.disable({ emitEvent: false });
          this.userInfoForm.get('enabled')?.disable({ emitEvent: false });
          this.userInfoForm.get('hidden')?.disable({ emitEvent: false });
          
        }
      }
    });
  }


  getUserName(email: any) {

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

  validEmail(component: any, result: any) {
    component.existEmailFlag = result;
    component.existUsername();

  }

  validMobile(component: any, result: any) {

    component.existMobileFlag = result;

  }

  validUsername(component: any, result: any) {
    component.existUsernameFlag = result;

  }


  existUsername() {
    let username = this.userInfoForm.value.username;
    if (username !== undefined && username !== "") {
      this.wsAuthenticateService.existUsername(username, this.utils).subscribe(this.utils.subscribeHandler(this, this.validUsername));

    }

  }

  existEmail() {
    let email = this.userInfoForm.value.email;
    if (email !== undefined && email !== "") {
      this.wsAuthenticateService.existEmail(email, this.utils).subscribe(this.utils.subscribeHandler(this, this.validEmail));

    }
  }

  existMobile() {

    let mobile = this.userInfoForm.value.mobile;
    let dialling_code = this.country.dialling_code;
    if (mobile !== undefined && mobile !== "" && this.country !== undefined) {
      let phoneNumber = dialling_code + mobile;
      this.wsAuthenticateService.existMobile(phoneNumber, this.utils).subscribe(this.utils.subscribeHandler(this, this.validMobile));

    }
  }


  closeAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCountryChange(country: any) {
    this.country = country;

  }



  onSubmit() {
 
    // TODO: Use EventEmitter with form value   

    if (this.existEmailFlag) {
      this.messageService.showDangerMessage("USER_FORM.EMAIL_EXIST");
      return;
    }
    if (this.existMobileFlag) {
      this.messageService.showDangerMessage("USER_FORM.MOBILE_EXIST");
      return;
    }
    if (this.existUsernameFlag) {
      this.messageService.showDangerMessage("USER_FORM.USERNAME_EXIST");
      return;
    }

    let user: UserBean | any = this.userInfoForm.getRawValue();
    let country = this.country;
    if (country == undefined) {
      this.messageService.showDangerMessage("USER_FORM.COUNTRY_REQUIRED");
      return;
    }
    if (!this.userInfoForm.valid) {
      this.messageService.showDangerMessage(this.userInfoForm.status);
      return;
    }
    if (this.companyService.getCompany().idCompany === undefined) {
      this.messageService.showDangerMessage("USER_FORM.COMPANY_REQUIRED");
      return;
    }

    user.idCompany = this.companyService.getCompany().idCompany;
    user.countryCode = country.code;
    const phoneNumberWithCountryCode = this.country.dialling_code + user.mobile;
    user.mobile = phoneNumberWithCountryCode;
    user.createAt = this.utils.getDateToISO(user.createAt);
    user.lastModif = this.utils.getDateToISO(user.lastModif);
    if (this.mode === "edit") {
      user.lastModifUser = this.userLoggedServiceService.getUserName();
      this.wsAuthenticateService.updateUsers(this.utils, user).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('USER_FORM.EDIT_SUCCESS', {
          username: this.user.username
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click();
      }));


    } else {
      user.createUser = this.userLoggedServiceService.getUserName();
      this.wsAuthenticateService.addUsers(this.utils, user).subscribe(this.utils.subscribeHandler(this, () => {
        this.type = 'success';
        this.message = this.translate.instant('USER_FORM.CONFIRMATION_EMAIL', {
          email: user.email,
          username: user.username
        });
        let element = document.getElementById("modalSuccess") as HTMLElement;
        element.click(); 
      }));

    }
  }

  getCompany() {
    return this.companyService.getCompany().name;
  }

  updateProfile() {
    this.userInfoForm.patchValue({
      firstName: 'Nancy',

    });
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.userInfoForm.patchValue({
      createAt:ahora,
      lastModif: ahora,
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpia el intervalo al destruir el componente
  }

  resetPassword() {
    let user: UserBean | any = this.userInfoForm.getRawValue();
    this.wsAuthenticateService.resetPassword(this.utils, user).subscribe(this.utils.subscribeHandler(this, () => {
      this.type = 'success';
      this.message = this.translate.instant('USER_FORM.RESET_EMAIL', {
        email: user.email,
        username: user.username
      });
      let element = document.getElementById("modalSuccess") as HTMLElement;
      element.click();
    }));
  }

}
