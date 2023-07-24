import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { loadAllTeacher } from '../../teacherFile/teacher/state/teacher.action';
import { selectAllteacherData } from '../../teacherFile/teacher/state/teacher.selector';
import { Store, select } from '@ngrx/store';
import { teacherData } from '../../teacherFile/teacher/state/teacher.interface';
import { Observable } from 'rxjs';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditClassService } from './edit-class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent {
  classData: any;
  submit:boolean = false
 
  constructor(
    private fb:FormBuilder,
    private store: Store<teacherData[]>,
    private dialogRef: MatDialogRef<EditClassComponent>,
    private service : EditClassService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}
  fetchData$!: Observable<any>
  id:any = this.data.id
  errorMessage !:string

  classForm = this.fb.group({
    maxStudents: ['', [Validators.required,Validators.pattern('^[0-9]+$')]],
    classTeacher: ['', [Validators.required]],
  })


  ngOnInit() {
    this.loadTeacher()
    this.laodClassData()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit(){
    this.submit = true
    console.log(this.classForm.controls);
    
    if(this.classForm.valid){
      this.service.updateClassData(this.id,this.classForm.value).subscribe((res)=>{
        if (res){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Class Added successfully'
          })
  
          this.dialogRef.close();
        }
      })
    }else{
       this.errorMessage = 'Fields are not properly filled check it out..'
    }
    

  }

  laodClassData(){
    this.service.fetchClassData(this.id).subscribe((res)=>{
      if(res){
        this.classData = res
      }
    })
  }

  loadTeacher() {
    this.store.dispatch((loadAllTeacher()))
    this.fetchData$ = this.store.pipe(select(selectAllteacherData))
  }

 

}
