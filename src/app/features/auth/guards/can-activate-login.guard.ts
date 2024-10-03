import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from 'src/app/features/users/services/users.service';
import { map, skipWhile, switchMap, tap } from 'rxjs';

export const getCanActivateLoginGuard: CanActivateFn = () => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  return usersService.initialized$.pipe(
    skipWhile(initialized => !initialized),
    switchMap(() => usersService.user$.pipe(map(user => user === null))),
    tap(unauthorized => (unauthorized ? undefined : router.navigate(['/home']))),
  );
};
