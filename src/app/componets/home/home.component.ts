import { Input, Component, Output, EventEmitter,AfterViewInit,ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../services/util/utils';
import { Router} from '@angular/router';


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  collapsed:boolean = false;

  constructor(private elementRef: ElementRef, private utils:Utils,private router: Router,) {}
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'white';
  }

  ngOnInit() {
    debugger;
   this.utils.getSession();

  // this.router.navigate(['/']);
  }

 title: string = "Hola";

  @Input() error: string = '';

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }


}