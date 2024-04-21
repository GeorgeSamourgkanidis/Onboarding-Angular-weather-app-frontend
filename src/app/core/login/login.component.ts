import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { setIsLoggedIn, setUsername } from '../../store/weather.actions';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { FacebookLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatButtonModule, NgIf, GoogleSigninButtonModule, SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  userInput: User = {
    username: '',
    password: ''
  };
  error: string;
  private store = inject(Store);
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.socialAuthService.authState.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      if (user) {
        // clear socialAuthService logged status because it bugs
        this.socialAuthService.signOut();
        // if email doesnt exist set name and if idToken doesnt exist set id
        this.socialLogin({ username: user.email ?? user.name, password: user.idToken ?? user.id });
      }
    });
  }

  register(user: User) {
    this.authService
      .register(user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.error = null;
          this.login(user);
        },
        error: error => {
          this.error = error.error;
        }
      });
  }

  login(user: User) {
    this.authService
      .login(user)
      .pipe(take(1))
      .subscribe({
        next: (token: string) => {
          this.loginSuccess(token, user.username);
        },
        error: error => {
          this.error = error.error;
        }
      });
  }

  loginSuccess(token: string, username: string) {
    this.error = null;
    sessionStorage.setItem('authToken', token);
    this.store.dispatch(setUsername({ username: username }));
    this.store.dispatch(setIsLoggedIn({ isLoggedIn: true }));
    this.router.navigate(['']);
  }

  socialLogin(user: User) {
    // login using email as username and idToken as password or else register and login
    this.authService
      .login(user)
      .pipe(take(1))
      .subscribe({
        next: (token: string) => {
          this.loginSuccess(token, user.username);
        },
        error: () => {
          this.register(user);
        }
      });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
