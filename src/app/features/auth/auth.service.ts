import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { IAuth } from './IAuth';
import { LocalStorageService } from '../../local-storage.service';
import { IToken } from './IToken';

@Service()
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private TOKEN_KEY: string = 'auth_token';
  private API_AUTH_URL: string = 'https://dummyjson.com/auth';
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!this.getAccessToken(),
  );
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  login(credential: IAuth): Observable<IToken> {
    return this.http.post<IToken>(`${ this.API_AUTH_URL }/login`, credential).pipe(
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
    return this.http.get(`${ this.API_AUTH_URL }/me`).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  refreshToken(): Observable<IToken> {
    const refreshToken: string | null = this.getRefreshToken();

    return this.http
      .post<IToken>(`${ this.API_AUTH_URL }/refresh`, { refreshToken, expiresInMins: 60 })
      .pipe(
        tap((response: IToken) => {
          if (response.accessToken && response.refreshToken) {
            this.saveTokens(response.accessToken, response.refreshToken);
          }
        }),
      );
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    const tokens: IToken = { accessToken, refreshToken };
    this.localStorageService.setItem(this.TOKEN_KEY, tokens);
    this.isAuthenticatedSubject.next(true);
  }

  getTokens(): IToken | null {
    return this.localStorageService.getItem<IToken>(this.TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return this.getTokens()?.accessToken ?? null;
  }

  getRefreshToken(): string | null {
    return this.getTokens()?.refreshToken ?? null;
  }

  logout(): void {
    this.localStorageService.deleteItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

}
