import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _dialogRef: DialogRef<AddEventComponent>
  ) {}

  ngOnInit(): void {}
  file!: File;
  submit: boolean = false;
  fileError:string = ''

  onFileSelected(event: Event) {
    this.file = <File>(event.target as HTMLInputElement)?.files?.[0];
    if (this.file) {
      this.formData.value.image = this.file.name;
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.formData.invalid) {
      
      this.fileError = 'Invalid file or not an image.'
      setTimeout(() => {
        this.fileError = ''
      }, 3000);
      
    }
  }

  formData = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', [Validators.required, this.fileTypeValidator]],
    date: ['', Validators.required],
    avenue: ['', Validators.required],
  });

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
}
