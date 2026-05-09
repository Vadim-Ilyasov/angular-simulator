import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { filter, Observable, tap, BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { UserService } from '../user.service';
import { IUser } from '../../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { LocalStorageService } from '../local-storage.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  loaderService: LoaderService = inject(LoaderService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  users$: Observable<IUser[]> = this.userService.users$;
  searchUser$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.searchUser$]).pipe(
    map(([users, selectedUsers]) => {
      if (!users) return [];
      return users.filter((user: IUser) => user.name?.trim().toLowerCase().includes(selectedUsers));
    }),
  );

  ngOnInit(): void {
    this.initUsers();
  }

  initUsers(): void {
    this.loaderService.showLoader();
    const usersFromStorage: IUser[] | null = this.localStorageService.getItem<IUser[]>('users');
    if(usersFromStorage?.length) {
      this.userService.setUsers(usersFromStorage);
      this.loaderService.hideLoader();
      return;
    }
    this.userService
    .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
    .subscribe();
  }
 

  deleteUser(id: number): void {
    this.userService.deleteUserCard(id);
  }

  addUser(users: IUser): void {
    this.userService.createUser(users);
  }

  selectUserByName(name: string): void {
    this.searchUser$.next(name);
  }

}
