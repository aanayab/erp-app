import { ComponentFixture, TestBed } from '@angular/testing';

import { TimezoneSelectorComponent } from './timezone-selector.component';

describe('TimezoneSelectorComponent', () => {
  let component: TimezoneSelectorComponent;
  let fixture: ComponentFixture<TimezoneSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimezoneSelectorComponent]
    });
    fixture = TestBed.createComponent(TimezoneSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
