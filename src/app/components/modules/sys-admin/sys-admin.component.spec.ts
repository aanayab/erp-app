import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdminComponent } from './sys-admin.component';

describe('SysAdminComponent', () => {
  let component: SysAdminComponent;
  let fixture: ComponentFixture<SysAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SysAdminComponent]
    });
    fixture = TestBed.createComponent(SysAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
