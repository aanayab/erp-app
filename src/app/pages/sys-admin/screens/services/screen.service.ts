import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private screenToEdit: any = null;

  setScreen(screen: any) {
    this.screenToEdit = screen;
  }

  getScreen() {
    return this.screenToEdit;
  }

  clearScreen() {
    this.screenToEdit = null;
  }
}
