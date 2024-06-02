import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

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
}
