import { ComponentFixture, TestBed } from '@angular/testing';

import { RoleSelectorMultipleComponent } from './role-selector-multiple.component';

describe('RoleSelectorMultipleComponent', () => {
  let component: RoleSelectorMultipleComponent;
  let fixture: ComponentFixture<RoleSelectorMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleSelectorMultipleComponent]
    });
    fixture = TestBed.createComponent(RoleSelectorMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
