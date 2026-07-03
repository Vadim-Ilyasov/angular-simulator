import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { PhoneFormatPipe } from '../phone-format.pipe';
import { AddBoldDirective } from '../add-bold.directive';
import { AnimatedGradientDirective } from '../animated-gradient.directive';


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UpperCasePipe, PhoneFormatPipe, AddBoldDirective, AnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({required: true}) user!: IUser;
  @Input() phoneMode: string = 'international';
  @Output() OndeleteUser: EventEmitter<number> = new EventEmitter<number>();

  deleteUserCard(): void {
    this.OndeleteUser.emit(this.user.id)
  }

}
