import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@services/utils/config.service';
import { GeneralSuccessResponse } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private readonly usersApiUrl = `${this.config.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public initPasswordReset(email: string): Observable<GeneralSuccessResponse> {
    return this.http.post<GeneralSuccessResponse>(`${this.usersApiUrl}/init-password-reset`, { email });
  }

  public passwordReset(id: string, newPassword: string, token: string): Observable<GeneralSuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<GeneralSuccessResponse>(`${this.usersApiUrl}/${id}/reset-password`, { newPassword }, httpOptions);
  }
}
