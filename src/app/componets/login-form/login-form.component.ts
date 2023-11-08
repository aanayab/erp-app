import { Input, Component, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WsAuthenticateService } from '../../services/ws-authenticate.service'
import { Token } from '../../model/token';
import { Utils } from '../../services/util/utils';

@Component({
  selector: 'my-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})
export class LoginFormComponent implements AfterViewInit {

  error: string = '';
  token?: Token;
  send: boolean = false;



  constructor(private elementRef: ElementRef, private router: Router, private wsAuthenticateService: WsAuthenticateService) { }


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
    debugger;
    this.send = true;
    this.error = '';
    if (this.form.valid) {
      // this.submitEM.emit(this.form.value);
      debugger
      this.wsAuthenticateService.getToken(this.form.value.username, this.form.value.password)
        .subscribe(
          {
            next: (response: any) => {
              this.send = false;
              if (response.status = 200) {
                var body = response.body;
                if (body.tipoMensaje = 'S') {
                  localStorage.setItem('SESSIONERPAPPTK', body.result);
                  this.router.navigate(['/home']);
                } else {
                  this.error = 'Username or password invalid';
                  this.send = false;
                  localStorage.removeItem("SESSIONERPAPPTK");
                  console.log(body.message);
                }

              }

              console.log(response)
            },
            error: (e: any) => {
              this.error = 'Username or password invalid';
              this.send = false;
              localStorage.removeItem("SESSIONERPAPPTK");
              console.log(e);
            }
          }


        );
    } else {
      this.error = 'Username or password invalid';
      this.send = false;

    }

  }

  errorChange() {
    this.error = '';
    this.send = false;


  }


  @Output() submitEM = new EventEmitter();


}
