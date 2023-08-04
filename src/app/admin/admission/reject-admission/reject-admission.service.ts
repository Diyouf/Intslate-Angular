import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class RejectAdmissionService {
    private readonly apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    rejectAdmission(id:string ): Observable<{success:boolean}> {
        
        return this.http.get<{success:boolean}>(`${this.apiUrl}/admin/rejectAdmission?id=${id}`)
    }

}