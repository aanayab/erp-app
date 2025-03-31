import { ComponentFixture, TestBed } from '@angular/testing';

import { MktComponent } from './marketing.component';

describe('MarketingComponent', () => {
  let component: MktComponent;
  let fixture: ComponentFixture<MktComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MktComponent]
    });
    fixture = TestBed.createComponent(MktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
