import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordForm } from '@features/profile/components/change-password-form/change-password-form.models';
import { ProfileHttpService } from '@features/profile/services/profile-http.service';
import { GlobalLoaderService } from '@services/global-loader.service';
import { ChangePasswordRequestBody } from '@features/profile/models/profile-http.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordFormValidators } from '@features/profile/components/change-password-form/change-password-form.validators';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [MatCard, MatFormField, MatInput, MatLabel, MatButton, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly profileHttpService = inject(ProfileHttpService);
  private readonly loaderService = inject(GlobalLoaderService);
  private readonly snackbar = inject(MatSnackBar);

  changePasswordForm = this.fb.group<ChangePasswordForm>({
    password: this.fb.control('', [Validators.required]),
    repeatPassword: this.fb.control('', [
      Validators.required,
      ChangePasswordFormValidators.passwordMismatchValidator(),
    ]),
  });

  handleFormSubmit(): void {
    if (this.changePasswordForm.invalid) return;

    console.log(this.changePasswordForm);

    const changePasswordBody = this.buildChangePasswordRequestBody();

    const stream$ = this.profileHttpService.changePassword$(changePasswordBody);

    this.loaderService.showUntilCompleted$(stream$).subscribe({
      next: () => {
        this.snackbar.open('Password changed successfuly', 'Dismiss', { duration: 5000 });
      },
    });
  }

  private buildChangePasswordRequestBody(): ChangePasswordRequestBody {
    return {
      password: this.changePasswordForm.controls.password.value,
    };
  }
}
