import { Component, inject } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { setIsLoggedIn, setUsername } from '../../store/weather.actions';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatButtonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = {
    username: '',
    password: ''
  };
  error: string;
  private store = inject(Store);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService
      .register(this.user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.error = null;
          this.login();
        },
        error: error => {
          this.error = error.error;
        }
      });
  }

  login() {
    this.authService
      .login(this.user)
      .pipe(take(1))
      .subscribe({
        next: (token: string) => {
          this.error = null;
          sessionStorage.setItem('authToken', token);
          this.store.dispatch(setUsername({ username: this.user.username }));
          this.store.dispatch(setIsLoggedIn({ isLoggedIn: true }));
          this.router.navigate(['']);
        },
        error: error => {
          this.error = error.error;
        }
      });
  }
}
