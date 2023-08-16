import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  ElementRef,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChatService } from './chat.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Message, allChat, returnData, teacherData } from './chat.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  newMessage$!: Observable<string>;
  messages: string[] = [];
  teacherData!: teacherData[];
  readonly studentId: string | null = localStorage.getItem('studentId');
  connectionData!: returnData;
  allMessages: allChat[] = [];
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  activeItemId: string | null = null;

  ngOnInit() {
    this.chatService.getNewMessage().subscribe(() => {
      this.loadMessages();
    });

    this.loadAllTeacher();
  }

  formData = this.fb.group({
    message: [''],
  });

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onSubmit() {
    const { message } = this.formData.value;
    if (message && message.trim() && this.formData.value) {
      if (!message) {
        return;
      } else {
        const data: Message = {
          senderName: <string>this.studentId,
          message: message,
          connectionId: <string>this.connectionData._id,
          to: <{ _id: string }>this.connectionData.connection?.teacher,
        };
        this.chatService.sendMessage(data);
        this.formData.reset();
      }
    } else {
      this.snackBar.open('Input field is empty', 'close', {
        panelClass: 'custom-snackbar',
        duration: 3000,
      });
    }
  }

  loadAllTeacher() {
    this.chatService.loadAllTeacher().subscribe((res) => {
      this.teacherData = res;
    });
  }

  addSuggestionToMessage(suggestion: string) {
    const messageControl = this.formData.get('message');
    if (messageControl) {
      messageControl.setValue(suggestion);
    }
  }

  setConnection(teacherId: string | null) {
    this.activeItemId = teacherId;
    const data = {
      teacherId: teacherId,
      studentId: this.studentId,
    };

    this.chatService
      .setConection(data)
      .pipe(
        tap((res) => {
          this.connectionData = res;
        })
      )
      .subscribe(() => {
        this.loadMessages();
      });
  }

  loadMessages() {
    this.chatService
      .loadMessages(this.connectionData._id)
      .subscribe((res: allChat[]) => {
        this.allMessages = res;
      });
  }
}
