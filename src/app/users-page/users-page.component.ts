import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);

  constructor() {
    this.userService.loadUsers();
  }

}
