import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class DeleteTeacherService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl

    deleteTeacher(id:string):Observable<{ success: boolean }>{
        return this.http.get<{ success: boolean }>(`${this.apiUrl}/admin/deleteTeacher/?id=${id}`)
    }
    
}