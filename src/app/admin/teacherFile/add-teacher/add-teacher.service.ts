import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment'

@Injectable({ providedIn:'root' })
export class AddteacherService {

    constructor(private http: HttpClient,  ) { }
    private apiUrl = environment.apiUrl
    toastFun(){
        this.toaster = true
    }
    toaster : boolean = false

    addTeacher(formdata:any):Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/admin/addTeacher`,formdata)
    }

}