import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { subject } from '../interface/subject.interface';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubjectService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    addSubject(data:subject):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/addSubject`,data)
    }

    fetchSubject(){
        return this.http.get<any>(`${this.apiUrl}/admin/fetchSubject`)
    }
    
}