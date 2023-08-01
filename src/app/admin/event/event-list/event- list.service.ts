import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventData } from './state/event.interface';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class loadEventService {
    constructor(private http:HttpClient) { }
    private readonly apiUrl = environment.apiUrl

    loadEvent():Observable<EventData[]>{
        return this.http.get<EventData[]>(`${this.apiUrl}/admin/loadEvnets`)
    }
    
}