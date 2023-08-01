import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventData } from './state/event.interface';
import { Store, select } from '@ngrx/store';
import { loadAllEvent } from './state/event.action';
import { Observable } from 'rxjs';
import { selectAlleventData } from './state/event.selector';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent  implements OnInit{
  constructor(private dialog: MatDialog,
    private store: Store<EventData[]>,
    ) {}

  ngOnInit(): void {
    this.loadEvent()
  }

    fetchData$!: Observable<EventData[]>;

  addEvent() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '672px',
      height: '752px',
      
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvent()
    });
  }

  loadEvent(){
    this.store.dispatch((loadAllEvent()))
    this.fetchData$ = this.store.pipe(select(selectAlleventData))
    
    
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }
}
