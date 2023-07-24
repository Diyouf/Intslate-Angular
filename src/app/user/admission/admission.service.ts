import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'

@Injectable({providedIn: 'root'})
export class AdmissionRequestService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    admissionReq(data:any):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/admissionRequest`,data)
    }
    
}