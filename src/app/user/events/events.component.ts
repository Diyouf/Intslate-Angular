import { Component, OnInit } from '@angular/core';
import { loadAllEvent } from '../../../app/admin/event/event-list/state/event.action';
import { EventData } from '../../../app/admin/event/event-list/state/event.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAlleventData } from 'src/app/admin/event/event-list/state/event.selector';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  constructor( private store: Store<{ events: EventData[] }>){}

  ngOnInit(): void {
    this.loadEvent()
  }
  fetchData$!: Observable<EventData[]>;

  loadEvent() {
    this.store.dispatch(loadAllEvent());
    this.fetchData$ = this.store.pipe(select(selectAlleventData));
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }


}
