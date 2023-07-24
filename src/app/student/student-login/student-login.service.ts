import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment'

@Injectable({providedIn: 'root'})
export class StudentLoginService {
    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    studentLogin(data:any){
        return this.http.post<any>(`${this.apiUrl}/student/login`, data);
    }
    
}