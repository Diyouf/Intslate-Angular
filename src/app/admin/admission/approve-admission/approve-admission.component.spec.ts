import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAdmissionComponent } from './approve-admission.component';

describe('ApproveAdmissionComponent', () => {
  let component: ApproveAdmissionComponent;
  let fixture: ComponentFixture<ApproveAdmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveAdmissionComponent]
    });
    fixture = TestBed.createComponent(ApproveAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
