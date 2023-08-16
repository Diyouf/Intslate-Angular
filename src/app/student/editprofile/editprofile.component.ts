import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentServiceService } from '../service/student.service';
import { formData } from './editprofile.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  constructor(private dialogRef:MatDialogRef<EditprofileComponent>,private fb:FormBuilder,private service:StudentServiceService){}

  confirmError:string = ''
  currWrong:string = ''
  submit : boolean = false
  readonly id : string | null = localStorage.getItem('studentId')

  onNoClick(){
    this.dialogRef.close()
  }

  data = this.fb.group({
    currentPass:['',[Validators.required]],
    newPass:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')]],
    confirmPass:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$')]],
  })
  
  onSubmit(){
    this.submit = true
    console.log(this.data.value);
    
    if(this.data.valid && this.data.value){
      const {newPass,confirmPass} = this.data.value
      if(newPass === confirmPass){
        const formData: formData = {
          currentPass: this.data.value.currentPass || null,
          newPass: this.data.value.newPass || null,
          confirmPass: this.data.value.confirmPass || null
        };
        this.service.resetPassword(this.id,formData).subscribe((res)=>{
          if(res.currWrong){
            this.currWrong  = res.currWrong
          }else{
            this.dialogRef.close()
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
              title: 'Password changed ,Successfully',
            });
          }
          
        })
      }else{
        this.confirmError = 'New password and confirm password should be same'
        setTimeout(() => {
          this.confirmError = ''
        }, 3000);
      }
    }
  }
}
