import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class StudentAuthInterceptor implements HttpInterceptor {
    constructor(private router:Router) { }

    intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
        const token = localStorage.getItem('studentToken');
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
       
        const decodedToken: {role:string} = this.decodeToken(token);
        const role = decodedToken.role;
        return role;
    }

    private decodeToken(token: string): any  {
        try {
            const decodedToken: JwtPayload = jwtDecode(token);
            

            return decodedToken;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            
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

                localStorage.removeItem('studentToken')
                localStorage.removeItem('studentId')
                this.router.navigate(['student/login']);
            }
        });
    }
}

interface decodeData {
    email:string
    exp:number
    sub:string
    role:string
    iat:number
}
