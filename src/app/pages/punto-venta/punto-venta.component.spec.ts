import { ComponentFixture, TestBed } from '@angular/testing';

import { PvComponent } from './punto-venta.component';

describe('PuntoVentaComponent', () => {
  let component: PvComponent;
  let fixture: ComponentFixture<PvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PvComponent]
    });
    fixture = TestBed.createComponent(PvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
