import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IGeneralSuccessResponse, IRegisterUserBody, IUser } from '@wheelscare/common';
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

  public registerUser(newUser: IRegisterUserBody): Observable<IUser> {
    return this.http.post<IUser>(`${this.authApiUrl}/register`, newUser);
  }

  public login(email: string, password: string): Observable<IGeneralSuccessResponse> {
    return this.http.post<IGeneralSuccessResponse>(`${this.authApiUrl}/login`, { email, password });
  }

  public logout(): Observable<any> {
    return this.http.post(`${this.authApiUrl}/logout`, {});
  }
}
