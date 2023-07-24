import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('teacherToken');
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['teacher/login']);
      return false;
    }
  }

}