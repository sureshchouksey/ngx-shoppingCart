import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManangeCouponComponent } from './manange-coupon.component';

describe('ManangeCouponComponent', () => {
  let component: ManangeCouponComponent;
  let fixture: ComponentFixture<ManangeCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManangeCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManangeCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
