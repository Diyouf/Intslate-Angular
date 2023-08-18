import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class TeacherAuthInterceptor implements HttpInterceptor {
    constructor(private router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('teacherToken');
        if (token) {
           
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    Role: this.getUserRoleFromToken(token)
                },
            });
            return next.handle(modifiedRequest);
        }

       
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.handleUnauthorizedAccess();
                }
                return throwError(error);
            })
        );;
    }

    private getUserRoleFromToken(token: string): string {
       
        const decodedToken: any = this.decodeToken(token);
        const role = decodedToken.role;
        return role;
    }

    private decodeToken(token: string): any {
       
        try {
            const decodedToken: JwtPayload = jwtDecode(token);
            
            return decodedToken;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return {};
        }

    }

    private handleUnauthorizedAccess() {
        Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
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
}
