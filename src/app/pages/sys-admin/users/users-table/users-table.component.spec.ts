import { ComponentFixture, TestBed } from '@angular/testing';

import { UsersTableComponent } from './users-table.component';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersTableComponent]
    });
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
