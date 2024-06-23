import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../../../../core/services/ws-authenticate/ws-authenticate.service'
import { Token } from '../../../../../core/model/token';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';
import { Utils } from '../../../../../core/util/utils';
import { UserLoggedServiceService } from 'src/app/core/services/helpers/userLoggedService/user-logged-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidatorService } from 'src/app/core/services/helpers/passwordValidator/password-validator.service';
import { EncryptionService } from 'src/app/core/services/helpers/encriptionService/encription-service.service';
import { MessageService } from 'src/app/core/services/helpers/message/message.service';


@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.css']
})
export class PasswordConfirmationComponent {

  errorMessage: string | null = null;
  passwordForm: FormGroup;
  showPassword: boolean = false; // Variable para manejar la visibilidad de la contraseña
  showConfirmPassword: boolean = false; // Variable para manejar la visibilidad de la contraseña



  constructor(private utils: Utils, private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateService,
    private loadingService: LoadingService, private userLoggedServiceService: UserLoggedServiceService, 
    private passwordValidatorService: PasswordValidatorService, private fb: FormBuilder,private messageService:MessageService
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: ['', [Validators.required]]
    });


  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return this.passwordValidatorService.validatePassword(control.value);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'var(--start-login-color)';
    this.utils.changeTheme();
  }

  onSubmit() {
    
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
      } else {
              // Handle successful form submission
              const urlTree = this.router.parseUrl(this.router.url);
              const token = urlTree.queryParams['token'];
              const encryptionService = new EncryptionService();
              const encryptedData = encryptionService.encrypt(this.passwordForm.value.password,token.substring(0,16));
              const params: { [key: string]: any } = {
                token: token,
                hidden: encryptedData
              };
        debugger;
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
