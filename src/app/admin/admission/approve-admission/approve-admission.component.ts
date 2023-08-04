import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApproveAdmissionService } from './approve-admission.service';
import Swal from 'sweetalert2';
import { Division, classForm } from './approve-admission.interface ';

@Component({
  selector: 'app-approve-admission',
  templateUrl: './approve-admission.component.html',
  styleUrls: ['./approve-admission.component.css']
})
export class ApproveAdmissionComponent implements OnInit {
  cDivision!: Division[];


  constructor(
    private dialogRef: MatDialogRef<ApproveAdmissionComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {id:string,ReqClass:string},
    private service: ApproveAdmissionService
  ) {
  }
  ngOnInit(): void {
    this.onSelectClass(this.studentData)

  }

  id:string  = this.data.id
  studentData: string = this.data.ReqClass

  onNoClick() {
    this.dialogRef.close()
  }

  
  classForm = this.fb.group({
    class: ['', [Validators.required]],
    division: ['', [Validators.required]],
  })


  onSubmit() {
    if(this.classForm.valid){
      const formValues:classForm  = {
        class: this.classForm.value.class ? Number(this.classForm.value.class) : null,
        division: this.classForm.value.division || null,
        
      };
      this.service.approveAdmission(this.id, formValues).subscribe((res) => {
        if (res.success) {
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
            title: 'Admission Approved'
          })
          this.dialogRef.close()
        }
      })
    }
    
  }

  onSelectClass(classNum: string) {
    this.service.getDivision(classNum).subscribe((res: Division[]) => {
      this.cDivision = res
    })

  }


}
