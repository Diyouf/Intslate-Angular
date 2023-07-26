import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeWork } from './homework.interface';
import { environment } from '../../../environment/environment';

@Injectable({providedIn: 'root'})
export class homeworkService {
    constructor(private http:HttpClient) { }
    private readonly apiUrl  =  environment.apiUrl

    fetchHomeWork(id:string|null):Observable<HomeWork[]>{
        return this.http.get<HomeWork[]>(`${this.apiUrl}/teacher/fetchHomework/?id=${id}`)
    }
    
}