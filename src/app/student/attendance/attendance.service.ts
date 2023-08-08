import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class AttendanceService {
    constructor(private http:HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    findAttendence(id:string|null):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/student/fetchAttendance/?id=${id}`)
    }
    
}