import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyBeanService {
  private screenToEdit: any = null;

  setCompany(screen: any) {
    this.screenToEdit = screen;
  }

  getCompany() {
    return this.screenToEdit;
  }

  clearCompany() {
    this.screenToEdit = null;
  }
}
