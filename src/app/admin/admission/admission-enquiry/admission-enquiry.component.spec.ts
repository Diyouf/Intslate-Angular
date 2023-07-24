import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionEnquiryComponent } from './admission-enquiry.component';

describe('AdmissionEnquiryComponent', () => {
  let component: AdmissionEnquiryComponent;
  let fixture: ComponentFixture<AdmissionEnquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionEnquiryComponent]
    });
    fixture = TestBed.createComponent(AdmissionEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
