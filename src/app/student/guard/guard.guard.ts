import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('studentToken');
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['student/login']);
      return false;
    }
  }

}