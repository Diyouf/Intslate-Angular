import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminloginService } from './login.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submit: boolean = false
  constructor(private fb: FormBuilder, private router: Router , private service:AdminloginService) { }

  data = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })

  EmailerrorMessg!: string
  PasErrorMessg!: string


  onSubmit() {
    this.submit = true
    const { email, password } = this.data.value
    if (email && password) {
      this.loginData(this.data.value)
    }
  }

    loginData(loginData: any) {
      this.service.adminLogin(loginData).subscribe((response) => {        
        if (response.Emailmessage) {
          this.EmailerrorMessg = response.Emailmessage
          setTimeout(() => {
            this.EmailerrorMessg = ''
          }, 3000);

        } else if (response.Passmessage) {
          this.PasErrorMessg = response.Passmessage
          setTimeout(() => {
            this.PasErrorMessg = ''
          }, 3000);

        } else {

          localStorage.setItem('adminToken', response.access_token);
          this.router.navigate(['/admin/dashboard'])

        }
      },
        (error) => {
          console.log(error);
        }
      )
    }



}
