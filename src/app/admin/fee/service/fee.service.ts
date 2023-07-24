import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root' })
export class feeService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl

    addFee(data:any):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/addfee`,data)
    }

    fetchAllFee():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/fetchFeeStructure`)
    }

    editFeeStructure(id:any,formData:any):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/editFeeStructue/?id=${id}`,formData)
    }

    studentFee():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/admin/studentFee`)
    }
    
}