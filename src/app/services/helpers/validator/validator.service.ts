import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

const rfcRegex = /^([A-ZÑ&]{3,4})\d{6}(?:[A-Z\d]{3})?$/;

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  

  constructor() { }

  static validatePassword(password: string): { [key: string]: boolean } | null {
    const errors: { [key: string]: boolean } = {};

    if (!password) {
      errors['required'] = true;
      return errors;
    }

    if (password.length < 8) {
      errors['minLength'] = true;
    }

    if (!/[A-Z]/.test(password)) {
      errors['uppercase'] = true;
    }

    if (!/[a-z]/.test(password)) {
      errors['lowercase'] = true;
    }

    if (!/[0-9]/.test(password)) {
      errors['number'] = true;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors['specialChar'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  
  static validatePhoneNumber(phoneNumber: string): { [key: string]: boolean } | null {
    const errors: { [key: string]: boolean } = {};

    if (!phoneNumber) {
      errors['required'] = true;
      return errors;
    }

    if (phoneNumber.length != 10) {
      errors['length'] = true;
    }

    if (!/^\d/.test(phoneNumber)) {
      errors['number'] = true;
    }



    return Object.keys(errors).length ? errors : null;
  }

    static phoneValidator(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const valid = /^\d{10}$/.test(control.value);
    return of(valid ? null : { invalidPhone: true });
    // Emit null, to indicate no error occurred.

  }

    static rfcValidatorIfMexico(getCountryFn: () => string | any ): ValidatorFn {
      return (control: AbstractControl) => {
        const country = getCountryFn();
        const rfc = control.value;
  debugger;
        if (country !== '484') {
          return null; // No aplica la validación si no es México
        }
  
        const valid = rfcRegex.test(rfc?.toUpperCase() || '');
        return valid ? null : { invalidRfc: true };
      };
    }

static urlValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;

    if (!value) return of(null);

    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-.,@?^=%&:\/~+#]*)?$/i;

    const valid = urlRegex.test(value);

    return of(valid ? null : { invalidUrl: true });
  }

}
