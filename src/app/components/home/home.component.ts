import { Input, Component, Output,ChangeDetectionStrategy, EventEmitter,AfterViewInit,ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../services/util/utils';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { MessageService } from 'src/app/services/message/message.service';




@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {

  collapsed:boolean = true;
  constructor(private elementRef: ElementRef, private utils:Utils,private router: Router,private messageService:MessageService) {    

  }


  
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'white';
  }




  simpleAlert(){
    Swal.fire("Herllo");

  }

  ngOnInit() {
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

  sidevarChange() {
    this.collapsed = !this.collapsed;
    }

}