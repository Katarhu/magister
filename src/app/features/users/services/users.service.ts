import { inject, Injectable } from '@angular/core';
import { UsersApiService } from 'src/app/features/users/services/users.api.service';
import { GlobalLoaderService } from 'src/app/services/global-loader.service';
import { IUser } from 'src/app/features/users/users.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly userApiService = inject(UsersApiService);
  private readonly loaderService = inject(GlobalLoaderService);

  user$ = new BehaviorSubject<IUser | null>(null);
  error$ = new BehaviorSubject<string | null>(null);
  initialized$ = new BehaviorSubject<boolean>(false);

  initialize() {
    this.initialized$.next(true);
  }

  setUser(user: IUser): void {
    this.user$.next(user);
  }

  setError(error: string): void {
    this.error$.next(error);
  }

  clear(): void {
    this.user$.next(null);
    this.error$.next(null);
  }
}
