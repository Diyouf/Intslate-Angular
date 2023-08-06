import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-applicatoin',
  templateUrl: './leave-applicatoin.component.html',
  styleUrls: ['./leave-applicatoin.component.css'],
})
export class LeaveApplicatoinComponent {
  constructor(
    private dialogRef: MatDialogRef<LeaveApplicatoinComponent>,
    private fb: FormBuilder
  ) {}

  submit: boolean = false;
  numberOfDays!: number;
  onNoClick() {
    this.dialogRef.close();
  }

  formData = this.fb.group({
    date: ['', [Validators.required]],
    noofday: [0],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    reason: ['', [Validators.required]],
  });

  onSubmit() {
    this.submit = true;
    console.log(this.formData.value);
    
    
  }

  startDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const start = target.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const parts = start.split('-');
    const startDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );

    startDate.setHours(0, 0, 0, 0);

    

    if (startDate >= currentDate) {
      // Valid start date
      this.formData.controls.startDate.setErrors(null);
      this.checkStartEndDates();
    } else {
      // Invalid start date
      this.formData.controls.startDate.setErrors({ invalidStartDate: true });
      this.formData.patchValue({ noofday: null }); // Reset the number of days
    }
  }

  endDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const end = target.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const parts = end.split('-');
    const endDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );

    endDate.setHours(0, 0, 0, 0);

    

    if (endDate >= currentDate) {
      // Valid end date
      this.formData.controls.endDate.setErrors(null);
      this.checkStartEndDates();
    } else {
      // Invalid end date
      this.formData.controls.endDate.setErrors({ invalidEndDate: true });
      this.formData.patchValue({ noofday: null }); 
    }
  }

  checkStartEndDates() {
    const startDate = this.formData.value.startDate;
    const endDate = this.formData.value.endDate;
  
    if (startDate && endDate) {
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
  
      if (parsedStartDate <= parsedEndDate) {
        if (
          !isNaN(parsedStartDate.getTime()) &&
          !isNaN(parsedEndDate.getTime())
        ) {
          const differenceInTime =
            parsedEndDate.getTime() - parsedStartDate.getTime();
          const differenceInDays: number | null = differenceInTime / (1000 * 3600 * 24);
          this.numberOfDays = differenceInDays || 0; // Use 0 as default if null
          this.formData.patchValue({ noofday: differenceInDays });
        }
      } else {
        // Invalid selection
        this.formData.controls.startDate.setErrors({ invalidStartDate: true });
        this.formData.controls.endDate.setErrors({ invalidEndDate: true });
        this.formData.patchValue({ noofday: null });
      }
    }
  }
  
  
}
