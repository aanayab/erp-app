import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../../core/services/ws-authenticate/ws-authenticate.service'
import { Token } from '../../../core/model/token';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';
import { Utils } from '../../../core/util/utils';
import { UserLoggedServiceService } from 'src/app/core/services/helpers/userLoggedService/user-logged-service.service';

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
    
    // localStorage.removeItem("SESSIONERPAPPTK");
    // localStorage.removeItem('SESSIONERPAPPUSR');
    // localStorage.removeItem('SESSIONERPAPPAUT');
    // localStorage.removeItem('SESSIONERPAPPUSN');
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
      this.error = 'Username or password invalid';
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
          //  if (body.tipoMensaje == 'S') {
          // Extraer solo el token
          const token = authorization.replace('Bearer ', '').trim();
          //  localStorage.setItem('SESSIONERPAPPTK', btoa(JSON.stringify(body.result)));
          //  localStorage.setItem('SESSIONERPAPPUSN', btoa(JSON.stringify(username)));
          this.userLoggedServiceService.setToken(token);
          this.userLoggedServiceService.setUserName(username);
          this.userLoggedServiceService.setUserLoggedIn(true);
          this.router.navigate(['/Home']);
          //  } else {
          //  this.error = 'Username or password invalid';
          // //  localStorage.removeItem("SESSIONERPAPPTK");
          // //  localStorage.removeItem('SESSIONERPAPPUSN');
          //  this.userLoggedServiceService.setUserName(undefined);
          //  this.userLoggedServiceService.setToken(undefined);
          //  this.loadingService.setLoading(false);
          //  }


        }
      },
      error: (e: any) => {
        debugger;
        // this.error = 'Username or password invalid';
        this.error = e.error;
        //  localStorage.removeItem("SESSIONERPAPPTK");
        //  localStorage.removeItem('SESSIONERPAPPUSN');
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
