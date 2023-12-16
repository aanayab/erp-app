import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../services/ws-authenticate/ws-authenticate.service'
import { Token } from '../../model/token';
import { Utils } from '../../services/util/utils';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'my-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})
export class LoginFormComponent implements AfterViewInit {

  error: string = '';
  token?: Token;




  constructor(private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateService,private loadingService:LoadingService) { }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.background = 'linear-gradient(90deg,#000000, #fc0303)';
  }

  ngOnInit(){
    localStorage.removeItem("SESSIONERPAPPTK");
    }


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.loadingService.setLoading(true);
    this.error = '';
    if (this.form.valid) {
      this.wsAuthenticateService.getToken(this.form.value.username, this.form.value.password)
        .subscribe(
          this.subscribeHandlerLogin()
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

  subscribeHandlerLogin(){
    return {
     next: (response: any) => {
      this.loadingService.setLoading(false);
       if (response.status = 200) {
         var body = response.body;
         if (body.tipoMensaje = 'S') {
           localStorage.setItem('SESSIONERPAPPTK', body.result);
           this.router.navigate(['/home']);
         } else {
           this.error = 'Username or password invalid';
           localStorage.removeItem("SESSIONERPAPPTK");
           this.loadingService.setLoading(false);
         }

       }
     },
     error: (e: any) => {
       this.error = 'Username or password invalid';
       localStorage.removeItem("SESSIONERPAPPTK");
       this.loadingService.setLoading(false);
     }
  }
   }


  @Output() submitEM = new EventEmitter();


}
