import { CanMatchFn } from '@angular/router';

export const canMatchPrivateGuard: CanMatchFn = () => {
  return false;
}
