import { ComponentFixture, TestBed } from '@angular/testing';

import { CompanySelectorComponent } from './company-selector.component';

describe('CompanySelectorComponent', () => {
  let component: CompanySelectorComponent;
  let fixture: ComponentFixture<CompanySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanySelectorComponent]
    });
    fixture = TestBed.createComponent(CompanySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
