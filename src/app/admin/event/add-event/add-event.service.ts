import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class addEventService {
    constructor(private http : HttpClient) { }
    private readonly apiUrl = environment.apiUrl 

    addEvent (fromData : FormData):Observable<boolean>{        
        return this.http.post<boolean>(`${this.apiUrl}/admin/addEvent`,fromData)
    }
}