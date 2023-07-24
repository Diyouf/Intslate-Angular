import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class DeleteTeacherService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl

    deleteTeacher(id:any){
        return this.http.get<any>(`${this.apiUrl}/admin/deleteTeacher/?id=${id}`)
    }
    
}