import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadSubject, subject } from '../interface/subject.interface';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubjectService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    addSubject(data:subject):Observable< {alreadyExist?:boolean,success?:boolean}>{
        return this.http.post< {alreadyExist?:boolean,success?:boolean}>(`${this.apiUrl}/admin/addSubject`,data)
    }

    fetchSubject():Observable<LoadSubject[]>{
        return this.http.get<LoadSubject[]>(`${this.apiUrl}/admin/fetchSubject`)
    }
    
}