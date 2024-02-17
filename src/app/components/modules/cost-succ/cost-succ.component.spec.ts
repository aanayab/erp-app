import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSuccComponent } from './cost-succ.component';

describe('CostSuccComponent', () => {
  let component: CostSuccComponent;
  let fixture: ComponentFixture<CostSuccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostSuccComponent]
    });
    fixture = TestBed.createComponent(CostSuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
