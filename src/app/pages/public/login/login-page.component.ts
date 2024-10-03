import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/pages/public/login/login-page.models';
import { RouterLink } from '@angular/router';

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
  private fb = inject(NonNullableFormBuilder);

  loginForm = this.fb.group<LoginForm>({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  handleFormSubmit() {}
}
