import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Division, classForm } from './approve-admission.interface ';

@Injectable({providedIn: 'root'})
export class ApproveAdmissionService {

    constructor(private http:HttpClient) { }
    private apiUrl = environment.apiUrl

    approveAdmission(id:string| null,formData:classForm):Observable<{success:boolean}>{        
        return this.http.post<{success:boolean}>(`${this.apiUrl}/admin/approveAdmission?id=${id}`,formData)
    }

    getDivision(classNum:string):Observable<Division[]>{
        return this.http.get<Division[]>(`${this.apiUrl}/admin/fetchDivisionforApprove/?class=${classNum}`)
    }
    
}