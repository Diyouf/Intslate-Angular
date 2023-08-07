import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { leaveFormData } from './leave-application.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LeaveApplicationService {
    constructor(private http : HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    leaveApplicatiion(id:string|null,formData:leaveFormData):Observable<{success:boolean}>{
        return this.http.post<{success:boolean}>(`${this.apiUrl}/student/leaveApplication/?id=${id}`, formData)
    }
    
}