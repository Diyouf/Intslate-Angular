import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({providedIn: 'root'})
export class ApproveAdmissionService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    approveAdmission(id:any,formData:any):Observable<any>{        
        return this.http.post(`${this.apiUrl}/admin/approveAdmission?id=${id}`,formData)
    }

    getDivision(classNum:string):Observable<any>{
        return this.http.get(`${this.apiUrl}/admin/fetchDivisionforApprove/?class=${classNum}`)
    }
    
}