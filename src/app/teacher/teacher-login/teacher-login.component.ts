import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeacherLoginValidation } from './teacher.service'
import { Router } from '@angular/router';
import { TeacherloginData } from './teacher-login.interface';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent {

  submit: boolean = false
  idMatch!: string;
  emailMatch!: string;
  passError!: string;
  alreadyReg!: string;
  constructor(private fb: FormBuilder, private service: TeacherLoginValidation, private router: Router) { }


  data = this.fb.group({
    teacherId: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')]]
  })

  onSubmit() {
    this.submit = true
    if (this.data.valid) {
      const formValues: TeacherloginData = {
        teacherId: this.data.value.teacherId ? Number(this.data.value.teacherId) : null,
        email: this.data.value.email || null,
        password: this.data.value.password || null,
      };
      this._TeacherLogin(formValues)
    }

  }

  get f() {
    return this.data.controls
  }

  _TeacherLogin(data: TeacherloginData) {
    this.service.validateLogin(data).subscribe((res) => {
      if (res.idNotmatch) {
        this.idMatch = res.idNotmatch
        setTimeout(() => {
          this.idMatch = ''
        }, 3000);
      } else if (res.emailError) {
        this.emailMatch = res.emailError
        setTimeout(() => {
          this.emailMatch = ''
        }, 3000);

      } else if (res.passError) {
        this.passError = res.passError
        setTimeout(() => {
          this.passError = ''
        }, 3000);

      } else if (res.regError) {
        this.alreadyReg = res.regError
        setTimeout(() => {
          this.alreadyReg = ''
        }, 3000);
      } else if (res.msg) {
        this.alreadyReg = res.msg
        setTimeout(() => {
          this.alreadyReg = ''
        }, 3000);
      } else {
        localStorage.setItem('teacherToken', res.access_token);
        localStorage.setItem('teacherId',res.id)
        this.router.navigate(['/teacher/dashboard'])
      }
    })
  }

}
