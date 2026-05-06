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
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  messageService: MessageService = inject(MessageService);

  setUsers(users: IUser[]): void {
    this.localStorageService.setItem('users', users);
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  createUser(newUser: IUser): void {
    const createdUsers: IUser[] = [...this.getUsers(), newUser];
    this.setUsers(createdUsers);
  }

  deleteUserCard(id: number): void {
    const updateUsers: IUser[] = this.getUsers().filter(
      (selectedUser: IUser) => selectedUser.id != id,
    );
    this.setUsers(updateUsers);
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    const localUsers: IUser[] | null = this.localStorageService.getItem<IUser[]>('users');
    if (localUsers) {
      this.usersSubject.next(localUsers);
      this.loaderService.hideLoader();
      return of(localUsers);
    }
    return this.userApiService.getUsers().pipe(
      tap((users) => {
        this.setUsers(users);
      }),
      catchError((error: string) => {
        this.messageService.showError('Нет пользователей для отображения');
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

}
