import { Component } from '@angular/core';
import { studentData } from './state/student.interface';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { loadAllStudent } from './state/student.action';
import { selectAllStudentData } from './state/student.selector';
import { ClassesService } from '../class/classes/classes.service';
import { classData } from '../class/classes/classes.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  classData!: classData[];

  constructor(private store : Store<studentData[]>,private service : ClassesService ){ }

  fetchData$!: Observable<studentData[]>
  currentPage: number = 1; 
  itemsPerPage: number = 6; 


  ngOnInit(): void {
    this.loadStudent()
    this.loadClasses()
  }


  loadStudent(){
    this.store.dispatch((loadAllStudent()))
    this.fetchData$ = this.store.pipe(select(selectAllStudentData))
  }

  loadClasses(){
      this.service.fetchClasses().subscribe((res) => {
        if (res) {
          this.classData = res
        }
      })
  }

  selectedValue: string = 'Recent Added ';
  searchTerm:string = ''

  updateFilteredData() {
    this.fetchData$ = this.store.pipe(
      select(selectAllStudentData),
      map((students: studentData[]) => {
        if (this.selectedValue === 'Recent Added ') {
          return students.filter(student =>
            student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
           
          );
        } else {
          return students.filter(student =>
            student.class._id === this.selectedValue &&
            (student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
          
          ));
        }
      })
    );
  }
  

  

}



