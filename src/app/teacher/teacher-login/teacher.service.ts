import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment'
import { TeacherloginData, returnData } from './teacher-login.interface';

@Injectable({providedIn: 'root'})
export class TeacherLoginValidation {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl
    
    validateLogin(data:TeacherloginData){
        return this.http.post<returnData>(`${this.apiUrl}/teacher/teacherLogin`, data);
    }

}