import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userToEdit: any = null;

  setUser(user: any) {
    this.userToEdit = user;
  }

  getUser() {
    return this.userToEdit;
  }

  clearUser() {
    this.userToEdit = null;
  }
}
