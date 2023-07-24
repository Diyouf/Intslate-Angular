import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { feeService } from '../service/fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-fee',
  templateUrl: './edit-fee.component.html',
  styleUrls: ['./edit-fee.component.css']
})
export class EditFeeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditFeeComponent>,
    private fb: FormBuilder,
    private service: feeService,
    @Inject(MAT_DIALOG_DATA) public parentData: any
  ) { }

  data = this.fb.group({
    term2: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    term1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    term3: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })


  feeData: any[] = []
  submit: boolean = false
  id:any = this.parentData.id


  ngOnInit(): void {
    this.service.fetchAllFee().subscribe((res) => {
      this.feeData = res
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submit = true
    if (this.data.valid) {
      this.service.editFeeStructure(this.id,this.data.value).subscribe((res)=>{
        if(res.success){
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
        }
      })
    }

  }
}