import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validatePassword(password: string): { [key: string]: boolean } | null {
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

  
  validatePhoneNumber(phoneNumber: string): { [key: string]: boolean } | null {
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
}
