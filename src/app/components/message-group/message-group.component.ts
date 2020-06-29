import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-group',
  templateUrl: './message-group.component.html',
  styleUrls: ['./message-group.component.scss'],
})
export class ChatItemComponent implements OnInit {
  @Input() messages: [];
  @Input() username: string;
  @Input() private uid: string;
  isOwner: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isOwner = this.uid === JSON.parse(localStorage.getItem('user')).uid;
  }
}
