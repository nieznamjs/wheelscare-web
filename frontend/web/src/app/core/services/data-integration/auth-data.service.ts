import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GeneralSuccessResponse, RegisterUserBody, User } from '@interfaces';
import { ConfigService } from '@services/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private readonly authApiUrl = `${this.config.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}

  public registerUser(newUser: RegisterUserBody): Observable<User> {
    return this.http.post<User>(`${this.authApiUrl}/register`, newUser);
  }

  public login(email: string, password: string): Observable<GeneralSuccessResponse> {
    return this.http.post<GeneralSuccessResponse>(`${this.authApiUrl}/login`, { email, password });
  }
}
