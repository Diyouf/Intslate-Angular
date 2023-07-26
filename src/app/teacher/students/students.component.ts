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
  private readonly id: string | null = localStorage.getItem('teacherId');

  studentData: studentData[] = [];
  originalStudentData: studentData[] = []; // Backup of original data
  currentPage: number = 1;
  itemsPerPage: number = 6;
  searchText: string = '';

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() {
    this.service.loadStudents(this.id).subscribe((res: studentData[]) => {
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
      this.studentData = this.originalStudentData.filter((student) =>
        student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.phone.toString().includes(this.searchText.toString())
      );
    }
  }
}
