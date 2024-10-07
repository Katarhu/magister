import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '@features/users/users.models';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly http = inject(HttpClient);

  getUser$(): Observable<IUser> {
    return this.http.get<IUser>(environment.endpoints.users.me);
  }
}
