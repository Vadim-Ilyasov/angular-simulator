import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

}
