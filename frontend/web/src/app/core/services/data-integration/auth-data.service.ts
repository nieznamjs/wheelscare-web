import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LoginResponse, RegisterUserBody, User } from '@interfaces';
import { ConfigService } from '@services/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public registerUser(newUser: RegisterUserBody): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}/auth/register`, newUser);
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.config.apiUrl}/auth/login`, { email, password });
  }
}
