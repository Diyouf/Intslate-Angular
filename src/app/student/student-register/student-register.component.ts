import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentLoginService } from './student-register.service';
import { StudnetRegisterData } from './student-register.interface';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {

  idMatch!: string;
  emailMatch!: string;
  phoneMatch!: string;
  alreadyReg: any;

  constructor(private fb: FormBuilder, private service: StudentLoginService, private router: Router) { }

  submit: boolean = false
  confirmError!: string

  data = this.fb.group({
    studentId: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
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
        const formValues: StudnetRegisterData = {
          studentId: this.data.value.studentId ? Number(this.data.value.studentId) : null,
          email: this.data.value.email || null,
          password: this.data.value.password || null,
          Conpassword: this.data.value.Conpassword || null,
          name: this.data.value.name || null,
          phone: this.data.value.phone ? Number(this.data.value.phone) : null,
        };
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
    this.service.studentRegister(data).subscribe((res:any) => {
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
        this.router.navigate(['/student/login'])
      }
    })
  }

  get f() {
    return this.data.controls
  }


}
