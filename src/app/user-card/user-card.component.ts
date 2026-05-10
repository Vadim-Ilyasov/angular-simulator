import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({required: true}) user!: IUser;
  @Output() OndeleteUser: EventEmitter<number> = new EventEmitter<number>();

  deleteUserCard(): void {
    this.OndeleteUser.emit(this.user.id)
  }

}
