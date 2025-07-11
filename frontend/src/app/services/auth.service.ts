import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionTimeoutService } from '../session/session-timeout.service';

export interface DecodedToken {
  exp: number;
  userId: string;
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private tokenTimer: any;
  private sessionTimeoutService!: SessionTimeoutService;

  constructor(private http: HttpClient, private router: Router) {
  }

  private _isAuthenticated = signal<boolean>(this.hasToken());
  isAuthenticated = this._isAuthenticated.asReadonly();

  setSessionTimeoutService(service: SessionTimeoutService) {
    this.sessionTimeoutService = service;
  }

 hasToken(): boolean {
  if (typeof sessionStorage !== 'undefined' && typeof sessionStorage !== null) {
    return !!sessionStorage.getItem('token');
  }
  return false;
}

  createNewAccount(registrationData: any) {
    return this.http.post('/api/register', registrationData);
  }

  userLogin(credentials: any) {
    return this.http
      .post<{ token: string; user: any }>('/api/login', credentials)
      .pipe(
        tap((res) => {
          const token = res.token;
          const decoded: DecodedToken = jwtDecode(token);
          const expiresIn = decoded.exp * 1000 - Date.now();
          //this.login(token);
          this.autoLogout(expiresIn);
        })
      );
  }

  login(token: string) {
    sessionStorage.setItem('token', token);
    this._isAuthenticated.set(true);
  }

  autoLogout(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    sessionStorage.removeItem('token');
    if (this.tokenTimer) clearTimeout(this.tokenTimer);
    this._isAuthenticated.set(false);
    this.sessionTimeoutService?.stopTracking();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<string> {
  return this.http.post<{ token: string }>('http://localhost:3000/api/refreshToken', {
    token: this.getToken(),
  }).pipe(
    tap((res) => {
      this.login(res.token); // store new token
    }),
    map(res => res.token)
  );
}

  getToken(): string | null {
    if (typeof window !== 'undefined' && sessionStorage) {

      return sessionStorage.getItem('token');
    }
    return null;
  }
}
