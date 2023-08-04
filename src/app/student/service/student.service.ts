import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { FeeStructure, PaidFeesInterface, token, unpaidTermsData } from '../fees-enquiry/fees-enquiry.interface';
import { studentProfileData } from '../profile-div/profile-div.interface';

@Injectable({ providedIn: 'root' })
export class StudentServiceService {
    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl

    fetchStudent(id:string| null ):Observable<studentProfileData> {
        return this.http.get<studentProfileData>(`${this.apiUrl}/student/fetchStudentProfile/?id=${id}`)
    }

    fetchfees():Observable<FeeStructure> {
        return this.http.get<FeeStructure>(`${this.apiUrl}/student/fetchfeesStructure`)
    }

    paidFees(id:string | null ):Observable<PaidFeesInterface> {
        return this.http.get<PaidFeesInterface>(`${this.apiUrl}/student/fetchPaidFees/?id=${id}`)
    }

    hitPayment(paymentData: token, term: unpaidTermsData, studentId:string | null):Observable<{success:boolean}> {
        return this.http.post<{success:boolean}>(`${this.apiUrl}/student/hitPayment/?studentId=${studentId}`, { paymentData, term })
    }

    fetchHomeWorks(id:string|null):Observable<any>{
        return this.http.get(`${this.apiUrl}/student/fetchHomeWorks/?id=${id}`)
    }
}