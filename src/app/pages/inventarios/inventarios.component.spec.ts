import { ComponentFixture, TestBed } from '@angular/testing';

import { InvComponent } from './inventarios.component';

describe('InventariosComponent', () => {
  let component: InvComponent;
  let fixture: ComponentFixture<InvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvComponent]
    });
    fixture = TestBed.createComponent(InvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
