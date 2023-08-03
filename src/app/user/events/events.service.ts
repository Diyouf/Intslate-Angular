import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDataUser } from './state/events.interface';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class EventUserService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl;

  loadEvents(): Observable<EventDataUser[]> {
    return this.http.get<EventDataUser[]>(`${this.apiUrl}/user/loadEvents`);
  }
}
