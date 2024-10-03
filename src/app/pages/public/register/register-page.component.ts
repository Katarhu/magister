import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { RegisterForm } from 'src/app/pages/public/register/register-page.models';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';

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
  private fb = inject(NonNullableFormBuilder);

  registerForm = this.fb.group<RegisterForm>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    consent: this.fb.control(false),
  });

  handleFormSubmit() {}
}
