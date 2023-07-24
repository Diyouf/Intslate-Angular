import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectAdmissionComponent } from './reject-admission.component';

describe('RejectAdmissionComponent', () => {
  let component: RejectAdmissionComponent;
  let fixture: ComponentFixture<RejectAdmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectAdmissionComponent]
    });
    fixture = TestBed.createComponent(RejectAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
