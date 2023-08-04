import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RejectAdmissionService } from './reject-admission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject-admission',
  templateUrl: './reject-admission.component.html',
  styleUrls: ['./reject-admission.component.css']
})
export class RejectAdmissionComponent {

  constructor(
    private dialogRef: MatDialogRef<RejectAdmissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string},
    private service:RejectAdmissionService
    ) { }

    id:string  = this.data.id
  onNoClick() {
    this.dialogRef.close();
  }

  rejectAdmission() {
    this.service.rejectAdmission(this.id).subscribe((res)=>{
      if (res) {
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
          icon: 'warning',
          title: 'Admission Rejected'
        })
        this.dialogRef.close()
      }
    })
  }

}
