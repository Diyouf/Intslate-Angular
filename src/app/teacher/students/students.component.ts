import { Component, OnInit } from '@angular/core';
import { TeacherStudentService } from './stuednt.service';
import { studentData } from './sudent.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(private service: TeacherStudentService) {}
  private readonly id: string |null = localStorage.getItem('teacherId');

  studentData! : studentData[]
  currentPage: number = 1; 
  itemsPerPage: number = 6; 

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() {
    this.service.loadStudents(this.id ).subscribe((res:studentData[]) => {
      this.studentData = res
    });
  }
}
