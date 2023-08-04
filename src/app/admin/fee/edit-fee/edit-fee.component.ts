import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { feeService } from '../service/fee.service';
import Swal from 'sweetalert2';
import { EditFee } from './edit-fee.interface';
import { FeeStructure } from '../fee-structure/fee-structure.interface';

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
    @Inject(MAT_DIALOG_DATA) public parentData: {id:string}
  ) { }

  data = this.fb.group({
    term2: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    term1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    term3: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })


  feeData: FeeStructure[] = []
  submit: boolean = false
  id:string = this.parentData.id


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
      const formData: EditFee = {
        term1: this.data.value.term1 ? Number(this.data.value.term1) : null,
        term2: this.data.value.term2 ? Number(this.data.value.term2) : null,
        term3: this.data.value.term3 ? Number(this.data.value.term3) : null,
      };
      this.service.editFeeStructure(this.id,formData).subscribe((res)=>{
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