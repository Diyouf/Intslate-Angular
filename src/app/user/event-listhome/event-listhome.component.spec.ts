import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListhomeComponent } from './event-listhome.component';

describe('EventListhomeComponent', () => {
  let component: EventListhomeComponent;
  let fixture: ComponentFixture<EventListhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListhomeComponent]
    });
    fixture = TestBed.createComponent(EventListhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
