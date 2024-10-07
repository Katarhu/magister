import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { RegisterForm } from '@pages/public/register/register-page.models';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '@features/auth/services/auth.api.service';
import { RegisterRequestBody } from '@features/auth/models/auth-http.models';
import { GlobalLoaderService } from '@services/global-loader.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatCheckbox,
    RouterLink,
  ],
})
export default class RegisterPageComponent {
  private readonly loaderService = inject(GlobalLoaderService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly router = inject(Router);

  registerForm = this.fb.group<RegisterForm>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    consent: this.fb.control(false, [Validators.requiredTrue]),
  });

  handleFormSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const body = this.buildRegisterRequestBody();
    const registerProcess$ = this.authApiService.register$(body);

    this.loaderService.showUntilCompleted$(registerProcess$).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  private buildRegisterRequestBody(): RegisterRequestBody {
    return {
      email: this.registerForm.controls.email.value,
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
    };
  }
}
