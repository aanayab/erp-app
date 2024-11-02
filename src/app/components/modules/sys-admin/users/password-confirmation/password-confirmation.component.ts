import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../../../../core/services/ws-authenticate/ws-authenticate.service'
import { Token } from '../../../../../core/model/token';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';
import { Utils } from '../../../../../core/util/utils';
import { UserLoggedServiceService } from 'src/app/core/services/helpers/userLoggedService/user-logged-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/core/services/helpers/validator/validator.service';
import { EncryptionService } from 'src/app/core/services/helpers/encriptionService/encription-service.service';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';
import { IConfig, ICountry } from 'ngx-countries-dropdown';
import { WsSmsService } from 'src/app/core/services/ws-sms/ws-sms.service';


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



  constructor(private utils: Utils, private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateService,
    private loadingService: LoadingService, private userLoggedServiceService: UserLoggedServiceService, 
    private ValidatorService: ValidatorService, private fb: FormBuilder,private messageService:MessageService,
    private wsSmsService:WsSmsService
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
    return this.ValidatorService.validatePassword(control.value);
  }

  
  phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return this.ValidatorService.validatePhoneNumber(control.value);
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
    debugger;
    if (this.passwordForm.value.phoneNumber.match(/^\d{10}$/)) {
      this.generatedCode = Math.floor(100000 + Math.random() * 9000).toString(); // Generar un código de 6 dígitos
      const urlTree = this.router.parseUrl(this.router.url);
      const phoneNumberWithCountryCode = this.country.dialling_code +this.passwordForm.value.phoneNumber;
      this.phoneNumberWithCountryCode = phoneNumberWithCountryCode;
      const token = urlTree.queryParams['token'];
      const message = "Su codigo de verficiación es: " + this.generatedCode;
      this.wsSmsService.sendSms(this.utils,phoneNumberWithCountryCode,message,token).subscribe(this.utils.subscribeHandler(this, () =>{
        this.smsSent = true;
        this.startCountdown(); // Arranca el temporizador de 60 segundos
      }));
    } else {
      this.errorMessage = 'Invalid phone number. Must be 10 digits.';
    }
  }

  // Verifica si el código ingresado es correcto
  verifySmsCode() {
    debugger;
    if (this.passwordForm.value.smsCode === this.generatedCode) {
      this.isPhoneVerified = true;
      this.isSending = true; // Habilita el botón para reenviar el código
      this.generatedCode = '';
      this.countdown = -1;
      this.errorMessage = null;
      this.smsSent = false;
      this.passwordForm.get('confirmPassword')?.enable();
      this.passwordForm.get('password')?.enable();
      // this.passwordForm.get('phoneNumber')?.disable();
      // this.passwordForm.get('phoneNumber')?.setValue('');
    } else {
      this.errorMessage = 'Incorrect SMS code. Please try again.';
    }
  }

  onSubmit() {
    debugger;
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
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
        this.wsAuthenticateService.confirmUser(confirmationEmailBean, this.utils).subscribe(this.utils.subscribeHandler(this, () =>{
          this.errorMessage = null;
          this.messageService.showSuccessMessage("Password confirmed successfully!");
          this.router.navigate(['/Login']);
        }));
        // alert();
      }
    } else {
      // Maneja el formulario inválido
    this.messageService.showDangerMessage("Formulario inválido "+ this.passwordForm.errors);

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

  // ngOnInit(){
  //   // localStorage.removeItem("SESSIONERPAPPTK");
  //   // localStorage.removeItem('SESSIONERPAPPUSR');
  //  // localStorage.removeItem('SESSIONERPAPPAUT');
  //   // localStorage.removeItem('SESSIONERPAPPUSN');
  //   this.userLoggedServiceService.setUserName(undefined);
  //   this.userLoggedServiceService.setToken(undefined);
  //   this.userLoggedServiceService.setUserLoggedIn(false);

  //   }

}
