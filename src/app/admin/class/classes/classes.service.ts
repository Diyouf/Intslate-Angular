import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment'

@Injectable({providedIn: 'root'})
export class ClassesService {
    
    constructor(private http:HttpClient) 
    { }
    private apiUrl = environment.apiUrl

    fetchClasses():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/fetchClasses`)
    }
    
}