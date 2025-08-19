import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrivilegyService {
  private privilegyToEdit: any = null;

  setPrivilegy(privilegy: any) {
    this.privilegyToEdit = privilegy;
  }

  getPrivilegy() {
    return this.privilegyToEdit;
  }

  clearPrivilegy() {
    this.privilegyToEdit = null;
  }
}
