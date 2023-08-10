import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { connectionData } from './chat.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({providedIn: 'root'})
export class ChatService {
    constructor(private http:HttpClient,private socket:Socket) { }
    private readonly apiUrl = environment.apiUrl
    

    loadConnection(id:string|null):Observable<connectionData[]>{
        return this.http.get<connectionData[]>(`${this.apiUrl}/teacher/getConnection/?id=${id}`)
    }

    loadAllChats(id:string | null |undefined){
        return this.http.get(`${this.apiUrl}/teacher/loadAllChats/?id=${id}`)
    }

    sendMessage(message:any):void{
        this.socket.emit('sendMessage',message)
    }
    getNewMessage():Observable<string>{
        return this.socket.fromEvent<string>('newMessages')
    }
}