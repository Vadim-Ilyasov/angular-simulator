import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { IAuth } from '../IAuth';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../message.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: T[K] extends object ? ModelFormGroup<T[K]> : FormControl<T[K]> ;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  messageService: MessageService = inject(MessageService);
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  loginForm: ModelFormGroup<IAuth> = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.processLogin();
  }

  processLogin(): void {
    this.isLoadingSubject.next(true);
    this.authService
    .login(this.loginForm.getRawValue())
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError(() => {
          this.messageService.showError('Неверный логин или пароль');
          return EMPTY;
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      )
    .subscribe();
  }

}
