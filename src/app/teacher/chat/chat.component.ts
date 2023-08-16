import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ChatService } from './chat.service';
import { allChat, connectionData } from './chat.interface';
import { FormBuilder, Validators } from '@angular/forms';
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
  readonly id = localStorage.getItem('teacherId');
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  studentdata!: connectionData[];
  allchats: allChat[] = [];
  connection!: string | undefined;
  studentId!: { _id: string };
  activeStudentId: string | null = null;

  ngOnInit(): void {
    this.loadConnection();
    this.chatService.getNewMessage().subscribe(() => {
      this.allmessages();
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  loadConnection() {
    this.chatService.loadConnection(this.id).subscribe((res) => {
      this.studentdata = res;
    });
  }

  loadChats(id: string | undefined, studentId: string) {
    this.activeStudentId = studentId;

    this.connection = id;
    this.studentId = {
      _id: studentId,
    };
    this.allmessages();
  }

  allmessages() {
    this.chatService
      .loadAllChats(this.connection)
      .subscribe((res: allChat[]) => {
        this.allchats = res;
      });
  }

  formData = this.fb.group({
    message: ['', Validators.pattern('^[s\t\n]*$')],
  });

  onSubmit() {
    const { message } = this.formData.value;
    if (message && message.trim() && this.formData.value) {
      const data = {
        senderName: this.id,
        message: message,
        connectionId: this.connection,
        to: this.studentId,
      };
      this.chatService.sendMessage(data);
      this.formData.reset();
    } else {
      this.snackBar.open('Input field is empty', 'close', {
        panelClass: 'custom-snackbar',
        duration: 3000,
      });
    }
  }
}
