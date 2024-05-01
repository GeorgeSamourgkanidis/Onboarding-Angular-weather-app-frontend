import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { Store } from '@ngrx/store';
import { setLoggedIn, setLoggedOut, setUsername } from './store/weather.actions';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from './store/weather.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoginComponent } from './core/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterOutlet, HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  private store = inject(Store);
  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.authService.getMe().subscribe({
      next: (name: string) => {
        this.store.dispatch(setUsername({ username: name }));
        this.store.dispatch(setLoggedIn());
      },
      error: () => {
        this.store.dispatch(setLoggedOut());
      }
    });
  }
}
