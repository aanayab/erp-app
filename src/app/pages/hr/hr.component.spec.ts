import { ComponentFixture, TestBed } from '@angular/testing';

import { HrComponent } from './hr.component';

describe('HrComponent', () => {
  let component: HrComponent;
  let fixture: ComponentFixture<HrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrComponent]
    });
    fixture = TestBed.createComponent(HrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
