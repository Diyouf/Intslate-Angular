import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { teacherProfileData } from './profile.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })
export class TeacherProfileService {
    constructor(private http:HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    loadTeacherProfile(id:string | null):Observable<teacherProfileData>{
        return this.http.get<teacherProfileData>(`${this.apiUrl}/teacher/loadTeacherProfile/?id=${id}`)
    }
    
}