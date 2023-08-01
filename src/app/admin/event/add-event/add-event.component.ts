import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { addEventService } from './add-event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _dialogRef: DialogRef<AddEventComponent>,
    private _service: addEventService
  ) {}

  ngOnInit(): void {}
  file!: File;
  submit: boolean = false;
  fileError: string = '';
  dateError: string = '';

  formData = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', [Validators.required, this.fileTypeValidator]],
    date: ['', Validators.required],
    avenue: ['', Validators.required],
  });

  onFileSelected(event: Event) {
    this.file = <File>(event.target as HTMLInputElement)?.files?.[0];
    if (this.file) {
      this.formData.value.image = this.file.name;
    }
  }

  onSubmit() {
    this.submit = true;

    const selectedDate: Date | null = this.parseDate(
      this.formData.value.date as string
    );
    const today: Date = new Date();
    if (selectedDate === null) {
      return;
    } else if (selectedDate <= today) {
      this.dateError = 'Selected date should be want future.';
      setTimeout(() => {
        this.dateError = '';
      }, 3000);
      return;
    }
    if (this.formData.invalid) {
      this.fileError = 'Invalid file or not an image.';
      setTimeout(() => {
        this.fileError = '';
      }, 3000);
    } else {
      if (this.formData && this.formData.controls) {
        const NewFile: FormData = new FormData();
        NewFile.append('file', this.file, this.file.name);
        Object.keys(this.formData.controls).forEach((controlName: string) => {
          const control = this.formData.get(controlName);
          if (control && control.valid) {
            const value = control.value;
            NewFile.append(controlName, value);
          }
        });
        this._service.addEvent(NewFile).subscribe((res) => {
          if (res === true) {
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
              title: 'Event Added successfully',
            });

            this._dialogRef.close();
          }
        });
      }
    }
  }

  fileTypeValidator(control: FormControl): { [key: string]: boolean } | null {
    const allowedFileTypes = ['png', 'jpg', 'jpeg'];
    if (control.value) {
      const fileExtension = control.value.split('.').pop().toLowerCase();
      if (!allowedFileTypes.includes(fileExtension)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  onNoClick() {
    this._dialogRef.close();
  }

  private parseDate(dateString: string | null): Date | null {
    if (dateString === null) {
      return null;
    }
    const timestamp: number = Date.parse(dateString);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}
