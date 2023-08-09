import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { connectionData } from './chat.interface';
import { FormBuilder } from '@angular/forms';

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

  ngOnInit(): void {
    this.loadConnection();
  }

  loadConnection() {
    this.chatService.loadConnection(this.id).subscribe((res) => {
      this.studentdata = res
    });
  }

  loadChats(id:string|undefined){
    this.chatService.loadAllChats(id).subscribe((res)=>{
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
      console.log(this.allchats);
      
      const data = {
        senderName:this.id,
        message:message,
        connectionId:this.allchats.connection._id,
        to:this.allchats.connection.connection.student
      }
      this.chatService.sendMessage(data)
      this.formData.reset()
    }
  }




}
