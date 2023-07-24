import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment'

@Injectable({providedIn: 'root'})
export class TeacherLoginValidation {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl
    
    validateLogin(data:any){
        return this.http.post<any>(`${this.apiUrl}/teacher/teacherLogin`, data);
    }

}