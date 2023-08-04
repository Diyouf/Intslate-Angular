import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'
import { AdminLogin, returnData } from './login.interface';

@Injectable({providedIn:'root'})
export class AdminloginService {

    constructor(private http :HttpClient) { }
    private apiUrl = environment.apiUrl

    adminLogin(logindata:AdminLogin):Observable<returnData>{
        return this.http.post<returnData>(`${this.apiUrl}/admin/login`,logindata)
    }
    
}