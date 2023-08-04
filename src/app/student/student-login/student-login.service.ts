import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment'
import { StudentLoginData, returndata } from './student-login.interface';

@Injectable({providedIn: 'root'})
export class StudentLoginService {
    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    studentLogin(data:StudentLoginData){
        return this.http.post<returndata>(`${this.apiUrl}/student/login`, data);
    }
    
}