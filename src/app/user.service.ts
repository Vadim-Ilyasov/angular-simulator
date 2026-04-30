import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, Observable, filter, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApiService: UserApiService = inject(UserApiService);
  loaderService: LoaderService = inject(LoaderService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();
  messageService: MessageService = inject(MessageService);
  private isVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isVisible$: Observable<boolean> = this.isVisibleSubject.asObservable();

  constructor() {
    if(this.localStorageService.getItem('users') != null) {
      this.userSubject.next(this.localStorageService.getItem('users') || [])
    }
    this.userSubject.pipe(
      tap((users: IUser[]) => this.localStorageService.setItem('users', users))
    ).subscribe();
  }

  setUsers(user: IUser[]): void {
    this.userSubject.next(user);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  createUser(newUser: IUser): void {
    this.userSubject.next([...this.getUsers(), newUser]);
  }

  deleteUserCard(id: number): void {
    const updateUsers: IUser[] = this.getUsers().filter(user => user.id != id);
    this.userSubject.next(updateUsers);
  }

  openUserForm(): void {
    this.isVisibleSubject.next(true);
  }

  closeUserForm(): void {
    this.isVisibleSubject.next(false);
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.userApiService.getUsers()
      .pipe(
        catchError((error: string) => {
          this.messageService.showError('Нет пользователей для отображения');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
  }

}
