import { ComponentFixture, TestBed } from '@angular/testing';

import { ThemeComponent } from './theme-component';

describe('UserComponentComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeComponent]
    });
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
