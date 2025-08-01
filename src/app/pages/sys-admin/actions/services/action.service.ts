import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private actionToEdit: any = null;

  setAction(action: any) {
    this.actionToEdit = action;
  }

  getAction() {
    return this.actionToEdit;
  }

  clearAction() {
    this.actionToEdit = null;
  }
}
