import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../../core/services/ws-authenticate/ws-authenticate.service'
import { Token } from '../../../core/model/token';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { Utils } from '../../../core/util/utils';
import { UserLoggedServiceService } from 'src/app/core/services/userLoggedService/user-logged-service.service';

@Component({
  selector: 'my-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})
export class LoginFormComponent implements AfterViewInit {

  error: string = '';
  token?: Token;




  constructor(private utils:Utils,private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateService,
    private loadingService:LoadingService,private userLoggedServiceService:UserLoggedServiceService) { }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'linear-gradient(90deg,#000000, #fc0303)';
  }

  ngOnInit(){
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


  

  subscribeHandlerLogin(username:string){
    return {
     next: (response: any) => {
      this.loadingService.setLoading(false);
       if (response.status == 200) {
         var body = response.body;
         if (body.tipoMensaje == 'S') {
          
          //  localStorage.setItem('SESSIONERPAPPTK', btoa(JSON.stringify(body.result)));
          //  localStorage.setItem('SESSIONERPAPPUSN', btoa(JSON.stringify(username)));
           this.userLoggedServiceService.setToken(body.result);
           this.userLoggedServiceService.setUserName(username);
           this.userLoggedServiceService.setUserLoggedIn(true);
           this.router.navigate(['/']);
         } else {
           this.error = 'Username or password invalid';
          //  localStorage.removeItem("SESSIONERPAPPTK");
          //  localStorage.removeItem('SESSIONERPAPPUSN');
           this.userLoggedServiceService.setUserName(undefined);
           this.userLoggedServiceService.setToken(undefined);
           this.loadingService.setLoading(false);
         }

       }
     },
     error: (e: any) => {
       this.error = 'Username or password invalid';
      //  localStorage.removeItem("SESSIONERPAPPTK");
      //  localStorage.removeItem('SESSIONERPAPPUSN');
       this.userLoggedServiceService.setUserName(undefined);
       this.userLoggedServiceService.setToken(undefined);
       this.loadingService.setLoading(false);
     }
  }
   }


  @Output() submitEM = new EventEmitter();


}
