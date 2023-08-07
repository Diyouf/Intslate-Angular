import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveReqData } from './leave-requests.interface';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class LeaveRequestService {
    constructor(private http :HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    loadLeaveReq(id:string|null):Observable<LeaveReqData[]>{
        return this.http.get<LeaveReqData[]>(`${this.apiUrl}/teacher/loadLeaveReq/?id=${id}`)
    }

    approve(id :string):Observable<{success:boolean}>{
        return this.http.get<{success:boolean}>(`${this.apiUrl}/teacher/approveReq/?id=${id}`)
    }

    reject(id :string):Observable<{success:boolean}>{
        return this.http.get<{success:boolean}>(`${this.apiUrl}/teacher/rejectReq/?id=${id}`)
    }
    
}