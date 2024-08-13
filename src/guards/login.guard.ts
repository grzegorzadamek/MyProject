import { Injectable } from '@angular/core';

import { Observable, of, take, map, catchError } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import * as logins from './../datas/logins.json';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard  {
  constructor(
    private _router: Router,
    private _authService: SocialAuthService,
  ) {}

  canActivate(): Observable<boolean> {
    return this._authService.authState.pipe(
      take(1),
      map((socialUser: SocialUser) => {
        if (
          (logins as any).default.find((x: any) => x.email === socialUser.email)
        ) {
          return true;
        } else {
          alert('You are not authorized to view this page');
          this._router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }
}
