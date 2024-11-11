import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '@pages/public/login/login-page.models';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '@features/auth/services/auth.api.service';
import { GlobalLoaderService } from '@services/global-loader.service';
import { Observable, switchMap, tap } from 'rxjs';
import { UsersApiService } from '@features/users/services/users.api.service';
import { UsersService } from '@features/users/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '@features/users/users.models';
import { LoginRequestBody } from '@features/auth/models/auth-http.models';
import { AuthTokenService } from '@services/auth-token.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    MatCard,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatCheckbox,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export default class LoginPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loaderService = inject(GlobalLoaderService);
  private readonly authApiService = inject(AuthApiService);
  private readonly usersApiService = inject(UsersApiService);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly authTokenService = inject(AuthTokenService);

  loginForm = this.fb.group<LoginForm>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  handleFormSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const loginRequestBody = this.buildLoginBody();
    const loginProcess$ = this.authApiService.login$(loginRequestBody).pipe(
      tap(loginResponse => this.authTokenService.setToken(loginResponse.access_token)),
      switchMap(() => this.fetchUser$()),
    );

    this.loaderService.showUntilCompleted$(loginProcess$).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  private buildLoginBody(): LoginRequestBody {
    return {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
  }

  private fetchUser$(): Observable<IUser> {
    return this.usersApiService.getUser$().pipe(
      tap({
        next: user => {
          this.usersService.setUser(user);
        },
        error: (error: HttpErrorResponse) => {
          this.usersService.setError(error.error.message);
        },
      }),
    );
  }
}
