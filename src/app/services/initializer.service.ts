import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setLoggedIn, setLoggedOut, setUsername } from '../store/weather.actions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  private store = inject(Store);

  constructor(private authService: AuthService) {}

  checkIfAuthorized = () => {
    return new Promise(resolve => {
      this.authService.getMe().subscribe({
        next: (name: string) => {
          this.store.dispatch(setUsername({ username: name }));
          this.store.dispatch(setLoggedIn());
          resolve(true);
        },
        error: () => {
          this.store.dispatch(setLoggedOut());
          resolve(true);
        }
      });
    });
  };
}
