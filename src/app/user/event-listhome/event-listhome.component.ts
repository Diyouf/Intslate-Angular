import { Component, HostListener, OnInit } from '@angular/core';
import { EventDataUser } from '../events/state/events.interface';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAllEventUser } from '../events/state/events.action';
import { selectAlleventUserData } from '../events/state/events.selector';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-listhome',
  templateUrl: './event-listhome.component.html',
  styleUrls: ['./event-listhome.component.css']
})
export class EventListhomeComponent implements OnInit{

  constructor( private store: Store<{ events: EventDataUser[] }>){}

  ngOnInit(): void {
    this.loadEvent()

  }
  fetchData$!: Observable<EventDataUser[]>;

  loadEvent() {
    this.store.dispatch(loadAllEventUser());
    this.fetchData$ = this.store.pipe(select(selectAlleventUserData));
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }





  


}
