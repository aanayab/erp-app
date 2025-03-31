import { ComponentFixture, TestBed } from '@angular/testing';

import { MenuMobileComponent } from './menu-mobile.component';

describe('MenuMobileComponent', () => {
  let component: MenuMobileComponent;
  let fixture: ComponentFixture<MenuMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMobileComponent]
    });
    fixture = TestBed.createComponent(MenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
