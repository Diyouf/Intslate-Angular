import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { teacherProfileData } from '../profile/profile.interface';
import { TeacherProfileService } from '../profile/profile.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {

  constructor(private router: Router,private service:TeacherProfileService) {
    this.loadTeacherProfile()
  }
  

  teacherData!:teacherProfileData

  readonly id = localStorage.getItem('teacherId')
  loadTeacherProfile(){
    this.service.loadTeacherProfile(this.id).subscribe((res:teacherProfileData)=>{
      this.teacherData = res
      if (this.teacherData.is_delete) {
        Swal.fire({
          icon: 'warning',
          title: 'Account Removed',
          text: 'Your Account is removed by Admin.',
          confirmButtonText: 'Login',
          allowOutsideClick: false,
      }).then((result) => {
          if (result.isConfirmed) {
              localStorage.removeItem('teacherToken')
              localStorage.removeItem('teacherId')
              this.router.navigate(['teacher/login']);
          }
      });
        

      }
    })
  }

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('teacherToken');
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/teacher/login']);
      return false;
    }
  }

}