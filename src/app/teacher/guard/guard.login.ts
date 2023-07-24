import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherLoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('teacherToken');
    if (isAuthenticated) {
        this.router.navigate(['/teacher']);
      return false;
    } else {
      return true;
    }
  }

}