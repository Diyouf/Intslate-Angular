import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment'

@Injectable({providedIn:'root'})
export class AdminloginService {

    constructor(private http :HttpClient) { }
    private apiUrl = environment.apiUrl

    adminLogin(logindata:{email:String, password:String}):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/login`,logindata)
    }
    
}