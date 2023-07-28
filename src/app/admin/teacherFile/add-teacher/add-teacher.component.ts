import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddteacherService } from './add-teacher.service';
import { SubjectService } from '../../subjectFile/service/subject.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  submit: boolean = false;
  subjectdata!: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AddteacherService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.subjectService.fetchSubject().subscribe((res) => {
      this.subjectdata = res;
    });
  }

  data = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    subject: ['', Validators.required],
    address: ['', Validators.required],
    image: ['', Validators.required],
  });

  EmailerrorMessg!: string;
  MobErrorMessg!: string;
  file!: File;

  onFileChange(event: Event) {
    this.file = <File>(event.target as HTMLInputElement)?.files?.[0];
    if (this.file) {
      this.data.value.image = this.file.name;
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.data.valid) {
      if (this.data && this.data.controls) {
        const NewFile: FormData = new FormData();
        NewFile.append('file', this.file, this.file.name);
        Object.keys(this.data.controls).forEach((controlName: string) => {
          const control = this.data.get(controlName);
          if (control && control.valid) {
            const value = control.value;
            NewFile.append(controlName, value);
          }
        });

        this.createTeacher(NewFile);
      }
    }
  }

  createTeacher(userData: any): void {
    this.service.addTeacher(userData).subscribe((res) => {
      if (res.EmailError) {
        this.EmailerrorMessg = res.EmailError;
        setTimeout(() => {
          this.EmailerrorMessg = '';
        }, 3000);
      } else if (res.Phoneerror) {
        this.MobErrorMessg = res.Phoneerror;
        setTimeout(() => {
          this.MobErrorMessg = '';
        }, 3000);
      } else {
        this.service.toastFun();
        this.router.navigate(['/admin/teacher']);
      }
    });
  }
}
