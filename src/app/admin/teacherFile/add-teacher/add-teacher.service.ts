import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment'
import { returnData } from './add-teacher.model';

@Injectable({ providedIn:'root' })
export class AddteacherService {

    constructor(private http: HttpClient,  ) { }
    private apiUrl = environment.apiUrl
    toastFun(){
        this.toaster = true
    }
    toaster : boolean = false

    addTeacher(formdata:FormData):Observable<returnData>{
        return this.http.post<returnData>(`${this.apiUrl}/admin/addTeacher`,formdata)
    }

}