import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/features/users/users.models';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  http = inject(HttpClient);

  getUser$(): Observable<IUser> {
    return this.http.get<IUser>(environment.endpoints.users.me);
  }
}
