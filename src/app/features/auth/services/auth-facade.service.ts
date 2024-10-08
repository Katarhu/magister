import { inject, Injectable } from '@angular/core';
import { UsersService } from '@features/users/services/users.service';
import { AuthApiService } from '@features/auth/services/auth.api.service';
import { GlobalLoaderService } from '@services/global-loader.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private readonly usersService = inject(UsersService);
  private readonly authApiService = inject(AuthApiService);
  private readonly loaderService = inject(GlobalLoaderService);

  logout$() {
    const stream$ = this.authApiService.logout$();

    return this.loaderService
      .showUntilRedirected$(stream$, 'Logging out')
      .pipe(finalize(() => this.usersService.clear()));
  }
}
