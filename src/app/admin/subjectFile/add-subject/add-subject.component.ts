import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from '../service/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent {
  submit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddSubjectComponent>,
    private fb: FormBuilder,
    private service: SubjectService
  ) {}

  stringOnly = '^[a-zA-Z0-9]+$';
  nameExist: string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submit = true;
    if (this.data.valid) {
      this.service.addSubject(this.data.value).subscribe((res: any) => {
        if (res.alreadyExist) {
          this.nameExist = 'This subject is aready Exist..';
          setTimeout(() => {
            this.nameExist = ''
          }, 3000);
        } else if (res.success) {
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
            title: 'Subject Added successfully',
          });

          this.dialogRef.close();
        }
      });
    }
  }

  data = this.fb.group({
    subjectName: [
      '',
      [Validators.required, Validators.pattern(this.stringOnly)],
    ],
  });
}
