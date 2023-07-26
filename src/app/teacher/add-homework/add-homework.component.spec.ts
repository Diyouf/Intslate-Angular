import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeworkComponent } from './add-homework.component';

describe('AddHomeworkComponent', () => {
  let component: AddHomeworkComponent;
  let fixture: ComponentFixture<AddHomeworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHomeworkComponent]
    });
    fixture = TestBed.createComponent(AddHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
