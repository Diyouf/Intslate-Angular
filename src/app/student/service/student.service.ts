import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class StudentServiceService {
    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl

    fetchStudent(id:string| null ) {
        return this.http.get<any>(`${this.apiUrl}/student/fetchStudentProfile/?id=${id}`)
    }

    fetchfees() {
        return this.http.get<any>(`${this.apiUrl}/student/fetchfeesStructure`)
    }

    paidFees(id:string | null ) {
        return this.http.get<any>(`${this.apiUrl}/student/fetchPaidFees/?id=${id}`)
    }

    hitPayment(paymentData: any, term: any, studentId:string | null) {
        return this.http.post<any>(`${this.apiUrl}/student/hitPayment/?studentId=${studentId}`, { paymentData, term })
    }
}