import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,  HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 0) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
            
                    Toast.fire({
                        icon: 'error',
                        title: 'An unexpected error occurred. Please try again later'
                      })
                    
                }
                return throwError(error);
            })
        );
    }
}
