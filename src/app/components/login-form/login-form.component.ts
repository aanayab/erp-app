import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../services/ws-authenticate/ws-authenticate.user.service'
import { Token } from '../../model/token';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { Utils } from '../../util/utils';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';

@Component({
  selector: 'my-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})
export class LoginFormComponent implements AfterViewInit {

  error: string = '';
  token?: Token;
  showPassword: boolean = false; // Variable para manejar la visibilidad de la contraseña




  constructor(private utils: Utils, private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateService,
    private loadingService: LoadingService, private userLoggedServiceService: UserLoggedServiceService) { }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'var(--start-login-color)';
    this.utils.changeTheme();
  }

  get passwordControl(): AbstractControl | any {
    return this.form.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    
    this.userLoggedServiceService.setUserName(undefined);
    this.userLoggedServiceService.setToken(undefined);
    this.userLoggedServiceService.setUserLoggedIn(false);

  }


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.error = '';
    if (this.form.valid) {
      this.wsAuthenticateService.getToken(this.form.value.username, this.form.value.password)
        .subscribe(
          this.subscribeHandlerLogin(this.form.value.username)
        );
    } else {
      this.error = 'LOGIN.INVALID';
      this.loadingService.setLoading(false);
    }

  }

  errorChange() {
    this.error = '';
    this.loadingService.setLoading(false);


  }




  subscribeHandlerLogin(username: string) {
    return {
      next: (response: any) => {
        
        this.loadingService.setLoading(false);
        if (response.status == 200) {
          // Leer los headers de la respuesta
          const headers = response.headers;

          const authorization = headers.get('Authorization');
          const browserUuid = localStorage.getItem("SESSIONERPAPPUUID");
          this.userLoggedServiceService.setBrowserUuid(browserUuid);
          localStorage.removeItem("SESSIONERPAPPUUID");
          const token = authorization.replace('Bearer ', '').trim();
          this.userLoggedServiceService.setToken(token);
          this.userLoggedServiceService.setUserName(username);
          this.userLoggedServiceService.setUserLoggedIn(true);
          this.router.navigate(['/Home']);
        }
      },
      error: (e: any) => {
        this.error = e.error;
        localStorage.removeItem("SESSIONERPAPPUUID");
        this.userLoggedServiceService.setBrowserUuid(undefined)
        this.userLoggedServiceService.setUserName(undefined);
        this.userLoggedServiceService.setToken(undefined);
        this.loadingService.setLoading(false);
      }
    }
  }


  @Output() submitEM = new EventEmitter();


}
