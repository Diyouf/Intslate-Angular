import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { classData } from '../classes/classes.interface';
import { EditClass } from './edit-class.interface';


@Injectable({providedIn: 'root'})
export class EditClassService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    fetchClassData(id :string):Observable<classData>{
        return this.http.get<classData>(`${this.apiUrl}/admin/fetchClassData/?id=${id}`)
    }
    
    updateClassData(id:string,formData:EditClass):Observable<{ success: boolean }>{
        return this.http.post<{ success: boolean }>(`${this.apiUrl}/admin/updateClassData/?id=${id}`,formData)
    }
}