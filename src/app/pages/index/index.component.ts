// Angular
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '@models/message.model';
import { AuthService } from '@services/auth.service';
import { ChatService } from '@services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageList') private messageListRef: ElementRef;
  messageForm: FormGroup;
  messages: Observable<Array<Message>>;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message: '',
    });
    this.messages = this.chatService.getMessages();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    this.chatService.sendMessage(this.messageForm.get('message').value);
    this.messageForm.reset();
    this.scrollToBottom();
  }

  logout() {
    this.authService.signOut();
  }

  scrollToBottom(): void {
    try {
      this.messageListRef.nativeElement.scrollTop = this.messageListRef.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
