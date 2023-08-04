import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentLoginService } from './student-login.service';
import { Router } from '@angular/router';
import { StudentLoginData } from './student-login.interface';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  submit : boolean = false 
  idMatch!: string;
  emailMatch!: string;
  passError!: string;
  alreadyReg!: string;
  constructor(private fb : FormBuilder , private service:StudentLoginService,private router:Router){}


  data = this.fb.group({
    studentId:['',[Validators.required,Validators.pattern('^[0-9]{5}$')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')]]
  })

  onSubmit(){
    this.submit = true
    if(this.data.valid){
      const formValues: StudentLoginData = {
        studentId: this.data.value.studentId ? Number(this.data.value.studentId) : null,
        email: this.data.value.email || null,
        password: this.data.value.password || null,
      };
      this._studentLogin(formValues)
    }

  }

  get f (){
    return this.data.controls
  }

  _studentLogin(data:StudentLoginData){
    this.service.studentLogin(data).subscribe((res)=>{      
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
      } else {
        this.router.navigate(['/student/home'])
        localStorage.setItem('studentToken', res.access_token);
        localStorage.setItem('studentId', res.id);
      }
    })
  }
}
