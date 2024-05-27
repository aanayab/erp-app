import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirComponent } from './direccion.component';

describe('DireccionComponent', () => {
  let component: DirComponent;
  let fixture: ComponentFixture<DirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirComponent]
    });
    fixture = TestBed.createComponent(DirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
