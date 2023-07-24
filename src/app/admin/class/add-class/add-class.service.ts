import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddClassService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl


    addClass(data: any): Observable<any>  {
        return this.http.post<any>(`${this.apiUrl}/admin/addClass`, data)
    }

    fetchDivision(className: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/admin/fetchDivision/?classNum=${className}`)
    }

}