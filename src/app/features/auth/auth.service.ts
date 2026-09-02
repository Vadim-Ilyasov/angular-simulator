import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, of, map } from 'rxjs';
import { IAuth } from './IAuth';
import { LocalStorageService } from '../../local-storage.service';
import { IToken } from './IToken';
import { IAuthUser } from './IAuthUser';
import { IAuthResponse } from './IAuthResponse';
import { TokenType } from './TokenType';


@Service()
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private TOKEN_KEY: string = 'auth_token';
  private API_AUTH_URL: string = 'https://dummyjson.com/auth';
  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();
  isAuthenticated$: Observable<boolean> = this.authUser$.pipe(
    map((user: IAuthUser | null) => !!user),
  );

  login(credential: IAuth): Observable<IAuthUser> {
    return this.http.post<IAuthResponse>(`${ this.API_AUTH_URL }/login`, credential).pipe(
      tap((response: IAuthResponse) => {
        if (response.accessToken && response.refreshToken) {
          this.saveTokens(response.accessToken, response.refreshToken);
        }
        this.authUserSubject.next(response);
      }),
    );
  }

  initAuth(): Observable<IAuthUser | null> {
    const token: string | null = this.getToken('access');
    if (!token) {
      this.logout();
      return of(null);
    }
    return this.http.get<IAuthUser>(`${ this.API_AUTH_URL }/me`).pipe(
      tap((user: IAuthUser) => {
        this.authUserSubject.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  refreshToken(): Observable<IToken> {
    const refreshToken: string | null = this.getToken('refresh');

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
  }

  getToken(type: TokenType = 'access'): string | null {
    const tokens: IToken  | null = this.localStorageService.getItem<IToken>(this.TOKEN_KEY);
    if(!tokens) return null;
    return type === 'access' ? tokens.accessToken : tokens.refreshToken;
  }

  logout(): void {
    this.localStorageService.deleteItem(this.TOKEN_KEY);
    this.authUserSubject.next(null);
  }

}
