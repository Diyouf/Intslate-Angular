import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'
import { StudnetRegisterData, returnDataRegister } from './student-register.interface';

@Injectable({providedIn: 'root'})
export class StudentLoginService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl

    studentRegister(data:StudnetRegisterData):Observable<returnDataRegister>{
        return this.http.post<returnDataRegister>(`${this.apiUrl}/student/register`,data)
    }

    
}