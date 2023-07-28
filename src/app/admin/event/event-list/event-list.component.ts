import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  constructor(private dialog: MatDialog) {}

  addEvent() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '672px',
    });
  }
}
