import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditComponent } from './auditoria.component';

describe('AuditoriaComponent', () => {
  let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditComponent]
    });
    fixture = TestBed.createComponent(AuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
