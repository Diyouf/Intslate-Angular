import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesEnquiryComponent } from './fees-enquiry.component';

describe('FeesEnquiryComponent', () => {
  let component: FeesEnquiryComponent;
  let fixture: ComponentFixture<FeesEnquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeesEnquiryComponent]
    });
    fixture = TestBed.createComponent(FeesEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
