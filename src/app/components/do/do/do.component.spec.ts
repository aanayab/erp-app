import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoComponent } from './do.component';

describe('DoComponent', () => {
  let component: DoComponent;
  let fixture: ComponentFixture<DoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoComponent]
    });
    fixture = TestBed.createComponent(DoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
