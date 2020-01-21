import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LoginResponse, RegisterUserBody, User } from '@interfaces';
import { ConfigService } from '@services/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  private readonly authApiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {
    this.authApiUrl = `${this.config.apiUrl}/auth`;
  }

  public registerUser(newUser: RegisterUserBody): Observable<User> {
    return this.http.post<User>(`${this.authApiUrl}/register`, newUser);
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authApiUrl}/login`, { email, password });
  }
}
