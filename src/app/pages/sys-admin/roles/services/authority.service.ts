import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorityService {
  private authorityToEdit: any = null;

  setAuthority(authority: any) {
    this.authorityToEdit = authority;
  }

  getAuthority() {
    return this.authorityToEdit;
  }

  clearAuthority() {
    this.authorityToEdit = null;
  }
}
