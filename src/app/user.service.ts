import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, Observable, tap } from 'rxjs';
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

  setUsers(user: IUser[]): void {
    this.userSubject.next(user);
    this.localStorageService.setItem('users', user);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  createUser(newUser: IUser): void {
    const createdUser: IUser[] = [...this.getUsers(), newUser];
    this.setUsers(createdUser);
    this.userSubject.next(createdUser);
  }

  deleteUserCard(id: number): void {
    const selectedUser: IUser[] = this.getUsers();
    const updateUsers: IUser[] = selectedUser.filter(
      (selectedUser: IUser) => selectedUser.id != id,
    );
    this.setUsers(updateUsers);
    this.userSubject.next(updateUsers);
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    const localUsers: IUser[] | null = this.localStorageService.getItem<IUser[]>('users');
    if (localUsers) {
      this.userSubject.next(localUsers);
      this.loaderService.hideLoader();
      return of(localUsers);
    }
    return this.userApiService.getUsers().pipe(
      tap((users) => {
        this.localStorageService.setItem('users', users);
        this.userSubject.next(users);
      }),
      catchError((error: string) => {
        this.messageService.showError('Нет пользователей для отображения');
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

}
