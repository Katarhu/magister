import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/pages/public/login/login-page.models';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'src/app/features/auth/services/auth.api.service';
import { LoginRequestBody } from 'src/app/features/auth/models/auth-http.models';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { switchMap, tap } from 'rxjs';
import { UsersApiService } from 'src/app/features/users/services/users.api.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  loginForm = this.fb.group<LoginForm>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  handleFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const loginRequestBody = this.buildLoginBody();
    const loginProcess$ = this.authApiService.login$(loginRequestBody).pipe(switchMap(() => this.fetchUser$()));

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

  private fetchUser$() {
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
