import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStructureComponent } from './fee-structure.component';

describe('FeeStructureComponent', () => {
  let component: FeeStructureComponent;
  let fixture: ComponentFixture<FeeStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeStructureComponent]
    });
    fixture = TestBed.createComponent(FeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
