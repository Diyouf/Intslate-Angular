import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { homeWorkData } from './add-homework.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddHomeWorkService {
    constructor(private http : HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    addHomeWork(id:string | null,formData:homeWorkData):Observable<boolean>{
        return this.http.post<boolean>(`${this.apiUrl}/teacher/addHomeWork/?id=${id}`,formData)
    }
    
}