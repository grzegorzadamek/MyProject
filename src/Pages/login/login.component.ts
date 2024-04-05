import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _user: SocialUser;
  private _loggedIn: boolean;

  constructor(
    private _authService: SocialAuthService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this._user = user;
      this._loggedIn = user != null;
      this._router.navigate(['/my-schedule']);
    });
  }
}
