import { FormControl } from '@angular/forms';

export interface ChangePasswordForm {
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
