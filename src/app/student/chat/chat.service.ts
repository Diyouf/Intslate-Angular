import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message, allChat, returnData, teacherData } from './chat.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({providedIn: 'root'})
export class ChatService {
    constructor(private socket:Socket,private http:HttpClient) { }
    private readonly apiUrl = environment.apiUrl
    

    sendMessage(message:Message ):void{
        this.socket.emit('sendMessage',message)
    }

    getNewMessage():Observable<string>{
        return this.socket.fromEvent<string>('newMessages')
    }

    loadAllTeacher():Observable<teacherData[]>{
        return this.http.get<teacherData[]>(`${this.apiUrl}/student/fetchTeacher`)

    }

    setConection(data :{teacherId:string|null,studentId :string|null}):Observable<returnData>{        
        return this.http.post<returnData>(`${this.apiUrl}/student/setConnection`,data)
    }
    

    loadMessages(id:string|null|undefined):Observable<allChat[]>{
        return this.http.get<allChat[]>(`${this.apiUrl}/student/loadMesssages/?id=${id}`)
    }
}