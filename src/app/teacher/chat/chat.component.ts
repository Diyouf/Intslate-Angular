import { Component, OnInit ,AfterViewChecked,ElementRef,ViewChild} from '@angular/core';
import { ChatService } from './chat.service';
import { allChat, connectionData, studentData } from './chat.interface';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit,AfterViewChecked {
  constructor(private chatService: ChatService, private fb: FormBuilder) {}
  readonly id = localStorage.getItem('teacherId');
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  studentdata!: connectionData[];
  allchats: allChat[] = [];
  connection!: string | undefined;
  studentId!: {id:string};
  messages: string[] = [];

  ngOnInit(): void {
    this.loadConnection();
    this.chatService
      .getNewMessage()
      .pipe(
        tap((message: string) => {
          this.messages.push(message);
        })
      )
      .subscribe(() => {
        this.allmessages();
      });
      
      
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  loadConnection() {
    this.chatService.loadConnection(this.id).subscribe((res) => {
      this.studentdata = res;
      console.log(this.studentdata);
    });
  }

  loadChats(id: string | undefined, studentId:string ) {

    console.log(studentId);

    this.connection = id;
    this.studentId ={
      id : studentId
    } ;
    this.allmessages();
  }

  allmessages() {
    this.chatService.loadAllChats(this.connection).subscribe((res:allChat[]) => {
      
      this.allchats = res;
      
    });
  }

  formData = this.fb.group({
    message: '',
  });

  onSubmit() {
    const { message } = this.formData.value;
    if (!message) {
      return;
    } else {
      const data = {
        senderName: this.id,
        message: message,
        connectionId: this.connection,
        to: this.studentId,
      };
      this.chatService.sendMessage(data);
      this.formData.reset();
    }
  }
}
