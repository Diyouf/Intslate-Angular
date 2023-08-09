import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChatService } from './chat.service';
import { FormBuilder } from '@angular/forms';
import { returnData, teacherData } from './chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  constructor(private chatService : ChatService,private fb:FormBuilder){}
  newMessage$!:Observable<string>
  messages:string [] =[]
  teacherData!:teacherData[]
  readonly studentId = localStorage.getItem('studentId')
  connectionData !:returnData
  allMessages:any[] = []

  ngOnInit() {
    this.chatService.getNewMessage().pipe(
      tap((message: string) => {
        this.messages.push(message)
       
      })
    ).subscribe(() => {
      this.loadMessages();
    });

    this.loadAllTeacher()
  }
  
  formData = this.fb.group({
    message:'',
  })

  onSubmit(){
    const {message} = this.formData.value
    if(!message){
      return
    }else{
      console.log("from "+this.studentId);
      console.log("to "+this.connectionData.connection?.teacher._id );
      
      
      const data = {
        senderName:this.studentId,
        message:message,
        connectionId:this.connectionData._id,
        to:this.connectionData.connection?.teacher
      }
      this.chatService.sendMessage(data)
      this.formData.reset()
    }
  }

  loadAllTeacher(){
    this.chatService.loadAllTeacher().subscribe((res)=>{
      this.teacherData = res
    })
  }


  setConnection(teacherId: string | null) {
    const data = {
      teacherId: teacherId,
      studentId: this.studentId,
    };
  
    this.chatService.setConection(data)
      .pipe(
        tap((res) => {
          this.connectionData = res;
        })
      )
      .subscribe(() => {
        this.loadMessages();
      });
  }
  

  loadMessages(){
    this.chatService.loadMessages(this.connectionData._id).subscribe((res:any)=>{
      this.allMessages = res
      console.log(this.allMessages);
      
    })
  }

}
