import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({providedIn: 'root'})
export class EditClassService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    fetchClassData(id :any):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/fetchClassData/?id=${id}`)
    }
    
    updateClassData(id:any,formData:any):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/updateClassData/?id=${id}`,formData)
    }
}