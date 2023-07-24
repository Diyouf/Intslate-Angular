import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class RejectAdmissionService {
    private apiUrl:any = environment.apiUrl

    constructor(private http: HttpClient) { }

    rejectAdmission(id: any): Observable<any> {
        
        return this.http.get<any>(`${this.apiUrl}/admin/rejectAdmission?id=${id}`)
    }

}