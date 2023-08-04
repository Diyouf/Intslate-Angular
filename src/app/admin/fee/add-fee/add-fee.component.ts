import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { feeService } from '../service/fee.service';
import Swal from 'sweetalert2';
import { AddFee } from './add-fee.interface';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.css'],
})
export class AddFeeComponent {
  constructor(
    private dialogRef: MatDialogRef<AddFeeComponent>,
    private fb: FormBuilder,
    private service: feeService
  ) {}

  submit: boolean = false;

  onSubmit() {
    this.submit = true;
    if (this.data.valid) {
      const formData: AddFee = {
        term1: this.data.value.term1 ? Number(this.data.value.term1) : null,
        term2: this.data.value.term2 ? Number(this.data.value.term2) : null,
        term3: this.data.value.term3 ? Number(this.data.value.term3) : null,
      };
      this.service.addFee(formData).subscribe((res) => {
        if (res) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Fee Added successfully',
          });
        }
      });
    }
  }

  data = this.fb.group({
    term2: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    term1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    term3: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  });

  onNoClick() {
    this.dialogRef.close();
  }
}
