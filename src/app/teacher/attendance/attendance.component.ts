import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from '../students/stuednt.service';
import { studentData } from '../students/sudent.interface';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestsComponent } from '../leave-requests/leave-requests.component';
import { AttendanceService } from './attendance.service';
import { AddAttendance, attendanceData } from './attendance.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  constructor(
    private serviceSudent: TeacherStudentService,
    private dialog: MatDialog,
    private service: AttendanceService,
    private snackBar : MatSnackBar
  ) {}
  private readonly id: string | null = localStorage.getItem('teacherId');

  studentData: studentData[] = [];
  originalStudentData: studentData[] = []; // Backup of original data
  currentPage: number = 1;
  itemsPerPage: number = 6;
  searchText: string = '';
  errorMessage: string = '';
  todayDate: Date = new Date();
  attendanceData! :attendanceData 

  ngOnInit(): void {
    this.loadStudent();
    this.loadAttendance()
  }

  loadStudent() {
    this.serviceSudent.loadStudents(this.id).subscribe((res: studentData[]) => {
      this.studentData = res;
      this.originalStudentData = [...res]; // Make a copy of the original data
      this.filterStudents(); // Initial filtering of students (optional)
    });
  }

  filterStudents() {
    if (this.searchText.trim() === '') {
      // If search is empty, display all students from the original data
      this.studentData = [...this.originalStudentData];
    } else {
      // Otherwise, filter based on search text from the original data
      this.studentData = this.originalStudentData.filter(
        (student) =>
          student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.phone.toString().includes(this.searchText.toString())
      );
    }
  }

  attendanceArray: { studentId: string; attendance: 'present' | 'absent' }[] =
    [];

  onRadioChange(value: 'present' | 'absent', studentId: string) {
    const index = this.attendanceArray.findIndex(
      (entry) => entry.studentId === studentId
    );

    if (index !== -1) {
      this.attendanceArray[index].attendance = value;
    } else {
      this.attendanceArray.push({ studentId, attendance: value });
    }
  }

  getAttendanceStatus(studentId: string): 'present' | 'absent' | null {
    const attendanceEntry = this.attendanceArray.find(
      (entry) => entry.studentId === studentId
    );
    return attendanceEntry ? attendanceEntry.attendance : null;
  }

  FullData() {
    if (this.studentData.length !== this.attendanceArray.length) {
      this.errorMessage =
        'please ensure that all students attendance is marked';
      setTimeout(() => {
        this.errorMessage = '';
      }, 4000);
    } else {
      const addAttendanceData: AddAttendance = {
        attendance: this.attendanceArray,
      };
      
      
      this.service.addAttendance(this.id, addAttendanceData).subscribe((res)=>{
        if(res.alreadySubmitted){
          this.snackBar.open( `today's attendance is already submitted`,'close',{
            panelClass: 'custom-snackbar', 
            duration:4000,
          })
        }else if (res.success == true){
          this.loadAttendance()
        }
      })
    }
  }

  formatDueDate(date: Date): string {
    return formatDate(date, 'MMM d, y', 'en-US'); // Customize the date format as needed
  }

  leaveReq() {
    const dialogRef = this.dialog.open(LeaveRequestsComponent, {
      width: '1200px',
      height: '600px',
      data: { id: this.id },
    });
  }

  loadAttendance(){
    const today = new Date();
    const id = this.id
    
    this.service.loadAttendance(id,today).subscribe((res)=>{
     this.attendanceData = res
     console.log(this.attendanceData.attendance);
     
      
    })
    

  }
}
