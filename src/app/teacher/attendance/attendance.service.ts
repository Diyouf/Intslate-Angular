import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AddAttendance } from './attendance.interface';

@Injectable({providedIn: 'root'})
export class AttendanceService {
    constructor(private http:HttpClient) { }

    private readonly apiUrl = environment.apiUrl

    addAttendance(id:string|null,data:AddAttendance):Observable<{success?:boolean,alreadySubmitted?:string}>{
        return this.http.post<{success?:boolean,alreadySubmitted?:string}>(`${this.apiUrl}/teacher/addAttendance/?id=${id}`,data)
    }
    
}