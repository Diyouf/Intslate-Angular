import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({providedIn: 'root' })
export class TeacherProfileService {
    constructor(private http:HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    loadTeacherProfile(id:any){
        return this.http.get(`${this.apiUrl}/teacher/loadTeacherProfile/?id=${id}`)
    }
    
}