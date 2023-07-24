import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDivComponent } from './profile-div.component';

describe('ProfileDivComponent', () => {
  let component: ProfileDivComponent;
  let fixture: ComponentFixture<ProfileDivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDivComponent]
    });
    fixture = TestBed.createComponent(ProfileDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
