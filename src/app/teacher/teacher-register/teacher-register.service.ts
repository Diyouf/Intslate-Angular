import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'
import { TeacherRegisterData, returnDataRegister } from './teacher-register.interface';

@Injectable({ providedIn: 'root' })
export class RegisterTeacherService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl

    createTeacherAccount(data: TeacherRegisterData): Observable<returnDataRegister> { 
        return this.http.post<returnDataRegister>(`${this.apiUrl}/teacher/teacherRegister`, data)
    }

}