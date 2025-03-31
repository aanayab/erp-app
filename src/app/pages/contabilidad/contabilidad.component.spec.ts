import { ComponentFixture, TestBed } from '@angular/testing';

import { ContaComponent } from './contabilidad.component';

describe('ContabilidadComponent', () => {
  let component: ContaComponent;
  let fixture: ComponentFixture<ContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContaComponent]
    });
    fixture = TestBed.createComponent(ContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
