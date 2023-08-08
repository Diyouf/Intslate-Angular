import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AddAttendance, attendanceData } from './attendance.interface';

@Injectable({providedIn: 'root'})
export class AttendanceService {
    constructor(private http:HttpClient) { }

    private readonly apiUrl = environment.apiUrl

    addAttendance(id:string|null,data:AddAttendance):Observable<{success?:boolean,alreadySubmitted?:string}>{
        return this.http.post<{success?:boolean,alreadySubmitted?:string}>(`${this.apiUrl}/teacher/addAttendance/?id=${id}`,data)
    }

    loadAttendance(id: string | null, today: Date): Observable<attendanceData> {
        const formattedDate = today.toISOString(); // Convert date to ISO string
        return this.http.get<attendanceData>(`${this.apiUrl}/teacher/loadAttendance/?id=${id}&today=${formattedDate}`);
      }
      
    
}