import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../../../environment/environment'
import { admissionData } from './state/admission.interface'

@Injectable({ providedIn: 'root' })
export class admissionActionService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl

    fetchAdmission():Observable<admissionData[]>{
        return this.http.get<admissionData[]>(`${this.apiUrl}/admin/getAdmissionData`);
    }

   

}