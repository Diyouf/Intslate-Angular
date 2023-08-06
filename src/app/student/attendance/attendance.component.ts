import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { LeaveApplicatoinComponent } from '../leave-applicatoin/leave-applicatoin.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent {
  constructor(private dialog : MatDialog){}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };

  leaveApplication(){
    const dialogRef = this.dialog.open(LeaveApplicatoinComponent,{
      width:'490px'
    })
  }
}
