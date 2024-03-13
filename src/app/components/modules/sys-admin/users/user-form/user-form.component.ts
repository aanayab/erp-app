import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormControl, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserBean } from 'src/app/core/model/userBean';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  panelOpenState = true;
  @Input() user?: UserBean | any;

  constructor(private formBuilder: FormBuilder) {}


  userInfoForm = this.formBuilder.group({
    username: [{value: '', disabled: true}, Validators.required],
    accountVerified: [{value: '', disabled: true}, Validators.required],
    createAt: [{value: '', disabled: true}, Validators.required],
    enabled: [{value: '', disabled: true}, Validators.required],
    failedLoginAttempts: [{value: '', disabled: true}, Validators.required],
    firstName: [{value: '', disabled: true}, Validators.required],
    lastModif: [{value: '', disabled: true},Validators.required],
    lastName: [{value: '', disabled: true},Validators.required],
    mfaEnabled : [{value:'', disabled: true},Validators.required],
    email: [{value:'', disabled: true},Validators.required],
    mobile: [{value:'', disabled: true},Validators.required],
    password: [{value:'', disabled: true},Validators.required],
    secret: [{value:'', disabled: true},Validators.required],
    token : [{value:'', disabled: true},Validators.required],
    country: [{value:'', disabled: true},Validators.required],
    company: [{value:'', disabled: true},Validators.required],
  
  });  

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userInfoForm.value);
  }
  
  // updateName() {
  //   this.name.setValue('Nancy');
  // }

  updateProfile() {
    this.userInfoForm.patchValue({
      firstName: 'Nancy',

    });
  }

}
