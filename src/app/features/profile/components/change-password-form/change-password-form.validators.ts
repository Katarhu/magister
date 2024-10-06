import { AbstractControl, ValidatorFn } from '@angular/forms';

export namespace ChangePasswordFormValidators {
  export function passwordMismatchValidator(): ValidatorFn {
    return (repeatPasswordControl: AbstractControl) => {
      const parentGroup = repeatPasswordControl.parent;

      if (!parentGroup) return null;

      const passwordControl = parentGroup.get('password');

      if (!passwordControl) return null;

      const haveExactValues = repeatPasswordControl.value === passwordControl.value;

      if (haveExactValues) return null;

      return {
        passwordMismatch: true,
      };
    };
  }
}
