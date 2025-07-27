import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateUserService } from '../../../../services/ws-authenticate/ws-authenticate.user.service'
import { Token } from '../../../../model/token';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { Utils } from '../../../../util/utils';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/helpers/validator/validator.service';
import { EncryptionService } from 'src/app/services/helpers/encriptionService/encription-service.service';
import { MessageService } from 'src/app/services/helpers/message/message.service';
import { IConfig, ICountry } from 'ngx-countries-dropdown';
import { WsSmsService } from 'src/app/services/ws-sms/ws-sms.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.css']
})
export class PasswordConfirmationComponent {


  generatedCode: string = '';
  smsSent: boolean = false;
  isPhoneVerified: boolean = false;
  countdown: number = 0;
  isSending: boolean = false;
  countdownInterval: any;
  country: ICountry | any;


  errorMessage: string | null = null;
  passwordForm: FormGroup;
  showPassword: boolean = false; // Variable para manejar la visibilidad de la contraseña
  showConfirmPassword: boolean = false; // Variable para manejar la visibilidad de la contraseña
  phoneNumberWithCountryCode:string = '';



  constructor(private utils: Utils, private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateUserService,
    private loadingService: LoadingService, private userLoggedServiceService: UserLoggedServiceService, 
     private fb: FormBuilder,private messageService:MessageService,
    private wsSmsService:WsSmsService,private translate:TranslateService
  ) {
    this.passwordForm = this.fb.group({
      password: [{value:'',disabled:!this.isPhoneVerified}, [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: [{value:'',disabled:!this.isPhoneVerified}, [Validators.required]],
      phoneNumber: [{value:'',disabled:this.isPhoneVerified}, [Validators.required, this.phoneNumberValidator.bind(this)]],
      smsCode: ['', [Validators.required]]
    });


  }
  onCountryChange(country: any) {
    this.country = country;

  } 

  selectedCountryConfig: IConfig = {
    hideCode: false,
    hideName: false
    
  };
  countryListConfig:  IConfig = {
    hideCode: false,
    hideName: false
    
  };

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return ValidatorService.validatePassword(control.value);
  }

  
  phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return ValidatorService.validatePhoneNumber(control.value);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'var(--start-login-color)';
    this.utils.changeTheme();
  }

    // Inicia el temporizador de 60 segundos
    startCountdown() {
      this.countdown = 60;
      this.isSending = true;
  
      // Reinicia el temporizador cada segundo
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.countdownInterval);
          this.isSending = false; // Habilita el botón para reenviar el código
          this.generatedCode = '';
          this.isPhoneVerified = false;
          this.smsSent = false;
          this.errorMessage = '';
        }
      }, 1000);
    }

  sendSmsCode() {
    
    if (this.passwordForm.value.phoneNumber.match(/^\d{10}$/)) {
    
      this.generatedCode = Math.floor(100000 + Math.random() * 9000).toString(); // Generar un código de 6 dígitos
      const urlTree = this.router.parseUrl(this.router.url);
      const phoneNumberWithCountryCode = this.country.dialling_code +this.passwordForm.value.phoneNumber;
      this.phoneNumberWithCountryCode = phoneNumberWithCountryCode;
      const token = urlTree.queryParams['token'];
      const message = this.translate.instant('PASSWORD_CONFIRMATION.SMS_GENERATED_CODE', {
        generatedCode: this.generatedCode,
      });
      this.wsSmsService.sendSms(this.utils,phoneNumberWithCountryCode,message,token).subscribe(this.utils.subscribeConfirmPasswordHandler(this, () =>{
        this.smsSent = true;
        this.startCountdown(); // Arranca el temporizador de 60 segundos
      }));
    } else {
      this.errorMessage = 'PASSWORD_CONFIRMATION.PHONE_NUMBER_INVALID';
    }
  }

  // Verifica si el código ingresado es correcto
  verifySmsCode() {
   
    if (this.passwordForm.value.smsCode === this.generatedCode) {
      this.isPhoneVerified = true;
      this.isSending = true; // Habilita el botón para reenviar el código
      this.generatedCode = '';
      this.countdown = -1;
      this.errorMessage = null;
      this.smsSent = false;
      this.passwordForm.get('confirmPassword')?.enable();
      this.passwordForm.get('password')?.enable();
    } else {
      this.errorMessage = 'PASSWORD_CONFIRMATION.SMS_INCORRECT_CODE';
    }
  }

  error(component:any){

    component.generatedCode = '';
    component.smsSent = false;
    component.isPhoneVerified = false;
    component.countdown = 0;
    component.isSending = false;
    component.country = null; 
  
    component.errorMessage = null;
    component.showPassword = false; // Variable para manejar la visibilidad de la contraseña
    component.showConfirmPassword = false; // Variable para manejar la visibilidad de la contraseña
    component.phoneNumberWithCountryCode = '';
     component.passwordForm.patchValue({
       password:'',
       confirmPassword:'',
       phoneNumber:'',
       smsCode: ''
     });
     component.passwordForm.get('password')?.disable();
     component.passwordForm.get('confirmPassword')?.disable();
    component.passwordForm.controls.phoneNumber.errors = undefined;

  }

  onSubmit() {
    
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
        this.errorMessage = 'PASSWORD_CONFIRMATION.PASSWORD_NOT_MATCH';
      } else {
              // Handle successful form submission
              const urlTree = this.router.parseUrl(this.router.url);
              const token = urlTree.queryParams['token'];
              const encryptionService = new EncryptionService();
              const encryptedData = encryptionService.encrypt(this.passwordForm.value.password,token.substring(0,16));
              const encryptePhone = encryptionService.encrypt(this.phoneNumberWithCountryCode ,token.substring(0,16));
              const params: { [key: string]: any } = {
                token: token,
                hidden: encryptedData,
                hidden2:encryptePhone
              };
        let confirmationEmailBean = { params, to: "" }
        this.wsAuthenticateService.confirmUser(confirmationEmailBean, this.utils).subscribe(this.utils.subscribeConfirmPasswordHandler(this, () =>{
          this.errorMessage = null;

          this.messageService.showSuccessMessage("PASSWORD_CONFIRMATION.SUCCESS");
          setTimeout(() => {
              this.router.navigate(['/Login']);
        }, 3000); // 3000 mili
        
        }));
        // alert();
      }
    } else {
      // Maneja el formulario inválido
    this.messageService.showDangerMessage("PASSWORD_CONFIRMATION.INVALID"+ this.passwordForm.errors);

    }

  }

  get passwordControl(): AbstractControl | any {
    return this.passwordForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get confirmPasswordControl(): AbstractControl | any {
    return this.passwordForm.get('confirmPassword');
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
