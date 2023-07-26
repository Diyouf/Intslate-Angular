import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentData } from './sudent.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class TeacherStudentService {
    constructor(private http : HttpClient) { }
    private apiUrl:string  =  environment.apiUrl

    loadStudents(id:string | null):Observable<studentData[]>{
        return this.http.get<studentData[]>(`${this.apiUrl}/teacher/fetchStudents/?id=${id}`)
    }
    
}