import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { studentData } from './state/student.interface';
import { environment } from '../../../../environment/environment'

@Injectable({providedIn: 'root'})
export class StudentService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl

    fetchStudent():Observable<studentData[]>{
        return this.http.get<studentData[]>(`${this.apiUrl}/admin/fetchStudent`);
    }
    
}