import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuToEdit: any = null;

  setMenu(menu: any) {
    this.menuToEdit = menu;
  }

  getMenu() {
    return this.menuToEdit;
  }

  clearMenu() {
    this.menuToEdit = null;
  }
}
