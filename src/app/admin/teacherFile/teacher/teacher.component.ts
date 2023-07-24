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
  ) { }

  fetchData$!: Observable<teacherData[]>
  currentPage: number = 1; 
  itemsPerPage: number = 6;
  searchTerm:string = ''

  ngOnInit(): void {
    this.loadTeachers()
    if (this.toaterService.toaster) {
      this.toast.success("Added successfull !", "Success")
      this.toaterService.toaster = false
    }
  }


  loadTeachers() {
    this.store.dispatch((loadAllTeacher()))
    this.fetchData$ = this.store.pipe(select(selectAllteacherData))

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
        return teachers.filter(teacher =>
          teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase()) 
        );
      })
    );
  }
  
}
