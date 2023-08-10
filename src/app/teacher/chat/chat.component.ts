import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { connectionData } from './chat.interface';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService,private fb:FormBuilder) {}
  readonly id = localStorage.getItem('teacherId');
  studentdata!:connectionData[]
  allchats :any=[]
  connection!:string |undefined
  studentId!:any
  messages:any[]=[]

  ngOnInit(): void {
    this.loadConnection();
    this.chatService.getNewMessage().pipe(
      tap((message: string) => {
        this.messages.push(message)
       
      })
    ).subscribe(() => {
      this. allmessages()
    });

   
  }

  loadConnection() {
    this.chatService.loadConnection(this.id).subscribe((res) => {
      this.studentdata = res
    });

  }

  loadChats(id:string|undefined,studentId:any){
    this.connection = id
    this.studentId = studentId
    this.allmessages()
    
  }

  allmessages(){
    this.chatService.loadAllChats(this.connection).subscribe((res)=>{
      this.allchats = res
      
      
    })
  }

 

  formData=this.fb.group({
    message:'',
  })

  onSubmit(){
    const {message} = this.formData.value
    if(!message){
      return
    }else{
           
      const data = {
        senderName:this.id,
        message:message,
        connectionId:this.connection,
        to:this.studentId
      }
      this.chatService.sendMessage(data)
      this.formData.reset()
    }
  }




}
