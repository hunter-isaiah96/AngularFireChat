import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '@models/message.model';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  getMessages() {
    let chat: any;
    const joinKeys = {};
    const messagesCollectionsRef = this.afs.collection<Message>(
      'messages',
      (ref) => ref.orderBy('date', 'asc')
    );
    return messagesCollectionsRef.snapshotChanges().pipe(
      switchMap((c) => {
        chat = c;
        const uids = Array.from(
          new Set(c.map((v) => v.payload.doc.data().uid))
        );
        const userDocs = uids.map((u) =>
          this.afs.doc<User>(`users/${u}`).valueChanges()
        );
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map((arr) => {
        arr.forEach((v) => (joinKeys[v.uid] = v));
        let messages: Array<Message> = [];
        let lastId: string = '';
        chat.forEach((v) => {
          if (v.payload.doc.data().uid === lastId) {
            messages[messages.length - 1].messages.push({
              ...v.payload.doc.data(),
            });
          } else {
            messages.push({
              user: joinKeys[v.payload.doc.data().uid],
              messages: [v.payload.doc.data()],
            });
            lastId = v.payload.doc.data().uid;
          }
        });
        return messages;
      })
    );
  }

  // getMessages() {
  //   let chat: any;
  //   const joinKeys = {};
  //   const messagesCollectionsRef = this.afs.collection<Message>(
  //     'messages',
  //     (ref) => ref.orderBy('date', 'asc')
  //   );
  //   return messagesCollectionsRef.snapshotChanges().pipe(
  //     switchMap((c) => {
  //       chat = c;
  //       const uids = Array.from(
  //         new Set(c.map((v) => v.payload.doc.data().uid))
  //       );
  //       const userDocs = uids.map((u) =>
  //         this.afs.doc<User>(`users/${u}`).valueChanges()
  //       );
  //       return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map((arr) => {
  //       arr.forEach((v) => (joinKeys[v.uid] = v));
  //       chat = chat.map((v: any) => {
  //         return {
  //           ...v.payload.doc.data(),
  //           user: joinKeys[v.payload.doc.data().uid],
  //         };
  //       });
  //       return chat;
  //     })
  //   );
  // }

  sendMessage(message: string) {
    this.afs.collection<Message>('messages').add({
      content: message,
      uid: this.authService.getCurrentUserUid(),
      date: new Date(),
    });
  }
}
