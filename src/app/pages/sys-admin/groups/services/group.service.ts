import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupToEdit: any = null;

  setGroup(group: any) {
    this.groupToEdit = group;
  }

  getGroup() {
    return this.groupToEdit;
  }

  clearGroup() {
    this.groupToEdit = null;
  }
}
