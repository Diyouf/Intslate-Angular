import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { AddFee } from '../add-fee/add-fee.interface';
import { EditFee } from '../edit-fee/edit-fee.interface';
import { FeeStructure, StudnetFeeData } from '../fee-structure/fee-structure.interface';

@Injectable({providedIn: 'root' })
export class feeService {

    constructor(private http : HttpClient) { }
    private apiUrl = environment.apiUrl

    addFee(data:AddFee):Observable<{success:boolean}>{
        return this.http.post<{success:boolean}>(`${this.apiUrl}/admin/addfee`,data)
    }

    fetchAllFee():Observable<FeeStructure[]>{
        return this.http.get<FeeStructure[]>(`${this.apiUrl}/admin/fetchFeeStructure`)
    }

    editFeeStructure(id:string,formData:EditFee):Observable<{ success: boolean }>{
        return this.http.post<{ success: boolean }>(`${this.apiUrl}/admin/editFeeStructue/?id=${id}`,formData)
    }

    studentFee():Observable<StudnetFeeData[]>{
        return this.http.get<StudnetFeeData[]>(`${this.apiUrl}/admin/studentFee`)
    }
    
}