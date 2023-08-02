import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventData } from './state/event.interface';
import { Store, select } from '@ngrx/store';
import { loadAllEvent } from './state/event.action';
import { Observable } from 'rxjs';
import { selectAlleventData } from './state/event.selector';
import { formatDate } from '@angular/common';
import { loadEventService } from './event- list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<{ events: EventData[] }>, // Update the Store type to match your actual store structure
    private _service: loadEventService
  ) {}

  ngOnInit(): void {
    this.loadEvent();
  }

  fetchData$!: Observable<EventData[]>;

  addEvent() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '672px',
      height: '752px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvent();
    });
  }

  loadEvent() {
    this.store.dispatch(loadAllEvent());
    this.fetchData$ = this.store.pipe(select(selectAlleventData));
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }

  toggleInactiveStatus(item: string) {
    if (item) {
      this.inactiveEvent(item);
    }
  }

  inactiveEvent(id: string) {
    if (id)
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do You want Hide this Event !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._service.inactiveEvent(id).subscribe((res: boolean) => {
            if (res == true) {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Event Hided ,SuccessFully',
              });
              this.loadEvent();
            }
          });
        }
      });
  }

  activeEvenet(id: string) {
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do You want Active this Event !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._service.activeEvent(id).subscribe((res) => {
            if (res == true) {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Event Activated ,SuccessFully',
              });
              this.loadEvent();
            }
          });
        }
      });
    }
  }
}
