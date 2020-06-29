import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private afa: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afa.authState.pipe(
      map((user) => {
        if (user === null) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
