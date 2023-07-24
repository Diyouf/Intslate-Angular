import { Component, OnInit } from '@angular/core';
import { AddteacherService } from '../add-teacher/add-teacher.service'
import { ToastrService } from 'ngx-toastr';
import { teacherData } from './state/teacher.interface'
import { loadAllTeacher } from './state/teacher.action'
import { selectAllteacherData } from './state/teacher.selector'
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTeacherComponent } from '../delete-teacher/delete-teacher.component';
import { SubjectService } from '../../subjectFile/service/subject.service';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {

  constructor(
    private store: Store<teacherData[]>,
    private toaterService: AddteacherService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private subjectService:SubjectService
  ) { }

  fetchData$!: Observable<teacherData[]>
  currentPage: number = 1; 
  itemsPerPage: number = 6;
  searchTerm:string = ''
  subjectData!:any[]
  selectedValue: string = 'Resend Added';

  ngOnInit(): void {
    this.loadTeachers()
    this.loadsubject()
    if (this.toaterService.toaster) {
      this.toast.success("Added successfull !", "Success")
      this.toaterService.toaster = false
    }
  }


  loadTeachers() {
    this.store.dispatch((loadAllTeacher()))
    this.fetchData$ = this.store.pipe(select(selectAllteacherData))

  }

  loadsubject(){
    this.subjectService.fetchSubject().subscribe((res)=>{
      this.subjectData = res
    })
  }

  deleteTeacher(id: any) {
    console.log("lfhfhf");
    
    const dialogRef = this.dialog.open(DeleteTeacherComponent,{
      height: '280px',
      width: '490px',
      data: { id: id }
      
    })
    dialogRef.afterClosed().subscribe(() => {
      this.loadTeachers()
    })
  }

  

  updateFilteredData() {
    this.fetchData$ = this.store.pipe(
      select(selectAllteacherData),
      map((teachers: teacherData[]) => {
        if (this.selectedValue === 'Resend Added') {
          // Filter teachers when 'Resend Added' is selected
          return teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase()) 
          );
        } else {
          // Filter teachers based on the selected subject (this.selectedValue) and the search term
          return teachers.filter(teacher =>
            teacher.subject._id === this.selectedValue &&
            (teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
          );
        }
      })
    );
  }
  
  
  
}
