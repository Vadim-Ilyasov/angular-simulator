import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  userApiService: UserApiService = inject(UserApiService);
  loaderService: LoaderService = inject(LoaderService);
  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.userSubject.next(user);
  }

  getUsers(): Observable<IUser[]> {
    return this.userApiService.getUsers();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.getUsers().pipe(
      catchError((error) => {
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }

}
