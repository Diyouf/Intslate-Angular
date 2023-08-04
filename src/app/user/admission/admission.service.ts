import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'

@Injectable({providedIn: 'root'})
export class AdmissionRequestService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    admissionReq(data:FormData):Observable<{ success: boolean }>{
        return this.http.post<{ success: boolean }>(`${this.apiUrl}/admin/admissionRequest`,data)
    }
    
}