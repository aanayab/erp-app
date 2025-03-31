import { ComponentFixture, TestBed } from '@angular/testing';

import { OpComponent } from './operaciones.component';

describe('OperacionesComponent', () => {
  let component: OpComponent;
  let fixture: ComponentFixture<OpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpComponent]
    });
    fixture = TestBed.createComponent(OpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
