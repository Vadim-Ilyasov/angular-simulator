import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { IAuth } from './IAuth';
import { LocalStorageService } from '../../local-storage.service';

@Service()
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private ACCESS_TOKEN_KEY: string = 'access_token';
  private REFRESH_TOKEN_KEY: string = 'refresh_token';
  private LOGIN_URL: string = 'https://dummyjson.com/auth/login';
  private REFRESH_URL: string = 'https://dummyjson.com/auth/refresh';
  private ME_URL: string = 'https://dummyjson.com/auth/me';
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!this.getAccessToken(),
  );
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  login(credential: IAuth): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(this.LOGIN_URL, credential)
      .pipe(
        tap((response) => {
          if (response.accessToken && response.refreshToken) {
            this.saveTokens(response.accessToken, response.refreshToken);
          }
        }),
      );
  }

  initAuth(): Observable<unknown> {
    const token: string | null = this.getAccessToken();
    if (!token) {
      this.logout();
      return of(null);
    }
    return this.http.get(this.ME_URL).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken: string | null = this.getRefreshToken();

    return this.http
      .post<{
        accessToken: string;
        refreshToken: string;
      }>(this.REFRESH_URL, { refreshToken, expiresInMins: 60 })
      .pipe(
        tap((response: { accessToken: string; refreshToken: string }) => {
          if (response.accessToken && response.refreshToken) {
            this.saveTokens(response.accessToken, response.refreshToken);
          }
        }),
      );
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    this.localStorageService.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    this.isAuthenticatedSubject.next(true);
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem(this.REFRESH_TOKEN_KEY);
  }

  logout(): void {
    this.localStorageService.deleteItem(this.ACCESS_TOKEN_KEY);
    this.localStorageService.deleteItem(this.REFRESH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }
   
}
