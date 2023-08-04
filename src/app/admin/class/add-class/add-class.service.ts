import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment'
import { Observable } from 'rxjs';
import { addClassData } from './add-class.interface';

@Injectable({ providedIn: 'root' })
export class AddClassService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl


    addClass(data: addClassData): Observable<{ success: boolean }>  {
        return this.http.post<{ success: boolean }>(`${this.apiUrl}/admin/addClass`, data)
    }

    fetchDivision(className: number): Observable<{division:string}> {
        return this.http.get<{division:string}>(`${this.apiUrl}/admin/fetchDivision/?classNum=${className}`)
    }

}