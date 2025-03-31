import { ComponentFixture, TestBed } from '@angular/testing';

import { PhoneSelectorComponent } from './phone-selector.component';

describe('PhoneSelectorComponent', () => {
  let component: PhoneSelectorComponent;
  let fixture: ComponentFixture<PhoneSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneSelectorComponent]
    });
    fixture = TestBed.createComponent(PhoneSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
