import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterTeacherService } from './teacher-register.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent {
  idMatch!: string;
  emailMatch!: string;
  phoneMatch!: string;
  alreadyReg: any;

  constructor(private fb: FormBuilder, private service: RegisterTeacherService, private router: Router) { }

  submit: boolean = false
  confirmError!: string

  data = this.fb.group({
    teacherId: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')]],
    Conpassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')]],
  })

  onSubmit() {
    this.submit = true
    if (this.data.valid) {
      if (this.data.value.Conpassword === this.data.value.password) {
        this._createTeacher(this.data.value)
      } else {
        this.confirmError = 'password and confirm password should be same'
        setTimeout(() => {
          this.confirmError = ''
        }, 3000);
      }
    }

  }

  _createTeacher(data: any) {
    this.service.createTeacherAccount(data).subscribe((res) => {
      if (res.idMatch) {
        this.idMatch = res.idMatch
        setTimeout(() => {
          this.idMatch = ''
        }, 3000);
      } else if (res.emailMatch) {
        this.emailMatch = res.emailMatch
        setTimeout(() => {
          this.emailMatch = ''
        }, 3000);

      } else if (res.phoneMatch) {
        this.phoneMatch = res.phoneMatch
        setTimeout(() => {
          this.phoneMatch = ''
        }, 3000);

      } else if (res.alreadyReg) {
        this.alreadyReg = res.alreadyReg
        setTimeout(() => {
          this.alreadyReg = ''
        }, 3000);

      } else {
        this.router.navigate(['/teacher/login'])
      }
    })
  }

  get f() {
    return this.data.controls
  }


}
