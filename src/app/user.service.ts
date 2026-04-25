import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApiService: UserApiService = inject(UserApiService);
  loaderService: LoaderService = inject(LoaderService);
  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();
  messageService: MessageService = inject(MessageService);

  setUsers(user: IUser[]): void {
    this.userSubject.next(user);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    console.log('1. Вызов loadUsers начат');
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
