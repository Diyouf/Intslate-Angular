import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teacherData } from './state/teacher.interface'
import { environment } from '../../../../environment/environment'

@Injectable({providedIn: 'root'})
export class teacherService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl
    
    fetchaAllTeacher():Observable<teacherData[]>{
        return this.http.get<teacherData[]>(`${this.apiUrl}/admin/getTeacher`)
    }

}