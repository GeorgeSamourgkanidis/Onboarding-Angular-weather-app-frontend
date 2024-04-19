import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(user: User) {
    return this.http.post(`${environment.baseBackendUrl}/Auth/register`, user);
  }

  public login(user: User): Observable<string> {
    return this.http.post(`${environment.baseBackendUrl}/Auth/login`, user, {
      responseType: 'text'
    });
  }

  public getMe(): Observable<string> {
    return this.http.get(`${environment.baseBackendUrl}/Auth`, {
      responseType: 'text'
    });
  }
}
