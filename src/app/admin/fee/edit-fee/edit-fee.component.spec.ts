import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeeComponent } from './edit-fee.component';

describe('EditFeeComponent', () => {
  let component: EditFeeComponent;
  let fixture: ComponentFixture<EditFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeeComponent]
    });
    fixture = TestBed.createComponent(EditFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
