import { ComponentFixture, TestBed } from '@angular/testing';

import { ProdComponent } from './produccion.component';

describe('ProduccionComponent', () => {
  let component: ProdComponent;
  let fixture: ComponentFixture<ProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdComponent]
    });
    fixture = TestBed.createComponent(ProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
