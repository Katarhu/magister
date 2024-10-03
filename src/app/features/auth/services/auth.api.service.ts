import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestBody, RegisterRequestBody } from 'src/app/features/auth/models/auth-http.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  login$(body: LoginRequestBody): Observable<void> {
    return this.http.post<void>(environment.endpoints.auth.login, body);
  }

  register$(body: RegisterRequestBody): Observable<void> {
    return this.http.post<void>(environment.endpoints.auth.register, body);
  }
}
