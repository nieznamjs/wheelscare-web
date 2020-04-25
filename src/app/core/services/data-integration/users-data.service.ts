import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGeneralSuccessResponse } from '@wheelscare/common';
import { ConfigService } from '@services/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private readonly usersApiUrl = `${this.config.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}

  public initPasswordReset(email: string): Observable<IGeneralSuccessResponse> {
    return this.http.post<IGeneralSuccessResponse>(`${this.usersApiUrl}/init-password-reset`, { email });
  }

  public passwordReset(id: string, newPassword: string, token: string): Observable<IGeneralSuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<IGeneralSuccessResponse>(`${this.usersApiUrl}/${id}/reset-password`, { newPassword }, httpOptions);
  }

  public activateUser(userId: string, token: string): Observable<IGeneralSuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<IGeneralSuccessResponse>(`${this.usersApiUrl}/${userId}/activate`, {}, httpOptions);
  }
}
