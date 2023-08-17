import { Component, OnInit } from '@angular/core';
import { studentData } from '../studentFile/student/state/student.interface';
import { Store, select } from '@ngrx/store';
import { loadAllStudent } from '../studentFile/student/state/student.action';
import { selectAllStudentData } from '../studentFile/student/state/student.selector';
import { Observable } from 'rxjs';
import { teacherData } from '../teacherFile/teacher/state/teacher.interface';
import { selectAllteacherData } from '../teacherFile/teacher/state/teacher.selector';
import { loadAllTeacher } from '../teacherFile/teacher/state/teacher.action';
import { ClassesService } from '../class/classes/classes.service';
import { SubjectService } from '../subjectFile/service/subject.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private studentStore : Store<studentData[]>,
    private teacherStore: Store<teacherData[]>,
    private classService: ClassesService,
    private subjectService: SubjectService
    ){}
  ngOnInit(): void {
    this.loadStudent()
    this.loadTeachers()
    this.loadClassData()
    this.loadSubject()

  }

  fetchDataStudent$!: Observable<studentData[]>
  fetchDataTeacher$!: Observable<teacherData[]>
  studentCount!:number
  teacherCount!:number
  classCount!:number
  subjectCount!:number
  
  loadStudent(){
    this.studentStore.dispatch((loadAllStudent()))
    this.fetchDataStudent$ = this.studentStore.pipe(select(selectAllStudentData));
    this.fetchDataStudent$.subscribe(students => {
      this.studentCount = students.length;
    });

  }

  
  loadTeachers() {
    this.teacherStore.dispatch((loadAllTeacher()))
    this.fetchDataTeacher$ = this.teacherStore.pipe(select(selectAllteacherData))
    this.fetchDataTeacher$.subscribe(teacher => {
      this.teacherCount = teacher.length;
    });
  }

  loadClassData() {
    this.classService.fetchClasses().subscribe((res) => {
      if (res) {
        this.classCount = res.length;
      }
    });
  }
  
  loadSubject() {
    this.subjectService.fetchSubject().subscribe((res) => {
      this.subjectCount = res.length;
      
    });
  }


}
