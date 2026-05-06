import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { IUserForm } from '../../interfaces/IUserForm';

@Component({ 
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  @Output() OnCreateUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private fb: FormBuilder = inject(FormBuilder);

  userForm: FormGroup<IUserForm> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: [0, [Validators.required, Validators.min(5), Validators.max(10)]],
      geo: this.fb.group({
        lat: [0, [Validators.required]],
        lng: [0, [Validators.required]],
      }),
    }),
    phone: [0, [Validators.required, Validators.min(10), Validators.max(25)]],
    website: ['', [Validators.maxLength(100)]],
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]],
    }),
  });

  onSubmit(): void {
    const newUser: IUser = {...this.userForm.getRawValue(), id: Date.now()};
    this.OnCreateUser.emit(newUser);
  }

}
