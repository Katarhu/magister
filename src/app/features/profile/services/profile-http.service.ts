import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordRequestBody } from 'src/app/features/profile/models/profile-http.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private readonly http = inject(HttpClient);

  changePassword$(body: ChangePasswordRequestBody) {
    return this.http.patch(environment.endpoints.users.changePassword, body);
  }
}
