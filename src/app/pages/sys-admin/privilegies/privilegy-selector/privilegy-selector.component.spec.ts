import { ComponentFixture, TestBed } from '@angular/testing';

import { PrivilegySelectorComponent } from './privilegy-selector.component';

describe('PrivilegySelectorComponent', () => {
  let component: PrivilegySelectorComponent;
  let fixture: ComponentFixture<PrivilegySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivilegySelectorComponent]
    });
    fixture = TestBed.createComponent(PrivilegySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
