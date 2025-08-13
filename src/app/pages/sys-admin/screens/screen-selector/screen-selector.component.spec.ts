import { ComponentFixture, TestBed } from '@angular/testing';

import { ScreenSelectorComponent } from './screen-selector.component';

describe('ScreenSelectorComponent', () => {
  let component: ScreenSelectorComponent;
  let fixture: ComponentFixture<ScreenSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenSelectorComponent]
    });
    fixture = TestBed.createComponent(ScreenSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
