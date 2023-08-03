import { Component, OnInit } from '@angular/core';
import { loadAllEventUser } from './state/events.action'; 
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { formatDate } from '@angular/common';
import { EventDataUser } from './state/events.interface';
import { selectAlleventUserData } from './state/events.selector';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
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
