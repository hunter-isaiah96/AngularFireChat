import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        return false;
      })
    );
  }

  async signIn(email: string, password: string) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this._snackBar.open(e.message, 'Dismiss', {
        duration: 2000,
      });
    }
  }

  async signUp(email: string, password: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.afs.doc<User>(`users/${res.user.uid}`).set({
        uid: res.user.uid,
        username: email.substring(0, email.indexOf('@')),
      });
      this.router.navigate(['/']);
    } catch (e) {
      this._snackBar.open(e.message, 'Dismiss', {
        duration: 2000,
      });
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (e) {
      console.log('Something is wrong: ', e.message);
    }
  }

  getCurrentUserUid(): string | null {
    return localStorage.getItem('user') !== null
      ? JSON.parse(localStorage.getItem('user')).uid
      : null;
  }
}
