import { Injectable } from '@angular/core';
import { IUser } from '@features/users/users.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user$ = new BehaviorSubject<IUser | null>(null);
  error$ = new BehaviorSubject<string | null>(null);
  initialized$ = new BehaviorSubject<boolean>(false);

  initialize(): void {
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
