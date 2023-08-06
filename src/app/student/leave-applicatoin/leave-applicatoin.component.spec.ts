import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicatoinComponent } from './leave-applicatoin.component';

describe('LeaveApplicatoinComponent', () => {
  let component: LeaveApplicatoinComponent;
  let fixture: ComponentFixture<LeaveApplicatoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveApplicatoinComponent]
    });
    fixture = TestBed.createComponent(LeaveApplicatoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
