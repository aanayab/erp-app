import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchComponent } from './compras.component';

describe('ComprasComponent', () => {
  let component: PurchComponent;
  let fixture: ComponentFixture<PurchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchComponent]
    });
    fixture = TestBed.createComponent(PurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
