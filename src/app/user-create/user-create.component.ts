import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from "@angular/forms";
import { IUser } from '../../interfaces/IUser';
import { AddBoldDirective } from '../add-bold.directive';
import { AnimatedGradientDirective } from '../animated-gradient.directive';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: T[K] extends object ? ModelFormGroup<T[K]> : FormControl<T[K]> ;
}>;

@Component({ 
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, AddBoldDirective, AnimatedGradientDirective],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  @Output() OnCreateUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private fb: FormBuilder = inject(FormBuilder);

  userForm: ModelFormGroup<IUser> = this.fb.nonNullable.group({
    id: [Date.now(), Validators.required],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    address: this.fb.nonNullable.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: [0, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.nonNullable.group({
        lat: [0, [Validators.required]],
        lng: [0, [Validators.required]],
      }),
    }),
    phone: [0, [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    company: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]],
    }),
  }) as ModelFormGroup<IUser>; 

  onSubmit(): void {
    const newUser: IUser = {...this.userForm.getRawValue(), id: Date.now()};
    this.OnCreateUser.emit(newUser);
  }

}
