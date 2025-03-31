import { ComponentFixture, TestBed } from '@angular/testing';

import { LenguageSelectorComponent } from './lenguage-selector.component';

describe('LenguageSelectorComponent', () => {
  let component: LenguageSelectorComponent;
  let fixture: ComponentFixture<LenguageSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LenguageSelectorComponent]
    });
    fixture = TestBed.createComponent(LenguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
