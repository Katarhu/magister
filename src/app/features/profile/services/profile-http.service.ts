import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordRequestBody } from '@features/profile/models/profile-http.models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private readonly http = inject(HttpClient);

  changePassword$(body: ChangePasswordRequestBody): Observable<void> {
    return this.http.patch<void>(environment.endpoints.users.changePassword, body);
  }
}
