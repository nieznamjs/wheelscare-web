import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { IGeneralSuccessResponse, IUser } from '@wheelscare/common';
import { ConfigService } from '@services/utils/config.service';
import { DataService } from '@services/data-integration/data.service';
import { WatchQueryResponse } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private readonly usersApiUrl = `${this.config.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private dataService: DataService,
  ) {}

  public getMe(): Observable<WatchQueryResponse<IUser>> {
    const query = gql`
      {
        me {
          id,
          email,
          role,
          vehicles {
            id,
            vin,
            brand,
          },
        },
      },
    `;

    return this.dataService.watchQuery<IUser>({ query });
  }

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
