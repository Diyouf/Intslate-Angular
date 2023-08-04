import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment'
import { classData } from './classes.interface';

@Injectable({providedIn: 'root'})
export class ClassesService {
    
    constructor(private http:HttpClient) 
    { }
    private apiUrl = environment.apiUrl

    fetchClasses():Observable<classData[]>{
        return this.http.get<classData[]>(`${this.apiUrl}/admin/fetchClasses`)
    }
    
}