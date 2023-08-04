import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteTeacherService } from './delete-teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.css']
})
export class DeleteTeacherComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id :string},
    private service:DeleteTeacherService
  ) { }

  id:string  = this.data.id

  onNoClick() {
    this.dialogRef.close();
  }

  deleteTeacher(){
    this.service.deleteTeacher(this.id).subscribe((res)=>{
      if(res.success){
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
          title: 'Deleted Successfully'
        })
        this.dialogRef.close()
      }
    })
  }


}
