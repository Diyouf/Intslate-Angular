import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { LeaveApplicatoinComponent } from '../leave-applicatoin/leave-applicatoin.component';
import { AttendanceService } from './attendance.service';
import { attendanceData } from './attendance.interface';
import { LeaveRequestsComponent } from '../leave-requests/leave-requests.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  constructor(private dialog: MatDialog, private service: AttendanceService) {}
  
  attendanceData!:attendanceData[]

  ngOnInit(): void {
    this.loadAttendance()
  }

  private readonly id: string | null = localStorage.getItem('studentId');

  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    weekends:false,
    events: [],
  };

  loadAttendance() {
    this.service.findAttendence(this.id).subscribe((res) => {
      this.attendanceData = res
      this.updateCalendarEvents()
      
    });
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.attendanceData.map(item => {
      return {
        title: item.attendance,
        date: item.date,
        display:'background',
        color: item.attendance === 'present' ? '#00FF00' : '#FF0000'
      };
    });
  }


  leaveApplication() {
    const dialogRef = this.dialog.open(LeaveApplicatoinComponent, {
      width: '490px',
    });
  }

  manageReq(){
    const dialogRef = this.dialog.open(LeaveRequestsComponent, {
      data: {},
      height:'459px'
    });

  }
}
