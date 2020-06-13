import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { IGeneralSuccessResponse } from '@wheelscare/common';
import { ConfigService } from '@services/utils/config.service';
import { DataService } from '@services/data-integration/data.service';
import { GetMeResponse, WatchQueryResponse } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private readonly authApiUrl = `${this.config.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private dataService: DataService,
  ) {}

  public getMe(): Observable<WatchQueryResponse<GetMeResponse>> {
    const query = gql`
      {
        me {
          id,
          email,
          role,
          vehicles {
            id,
            vin,
            type,
            brand,
            vehicleModel,
            generation,
            name,
          },
        },
      },
    `;

    return this.dataService.watchQuery<GetMeResponse>({ query });
  }

  public initPasswordReset(email: string): Observable<IGeneralSuccessResponse> {
    return this.http.post<IGeneralSuccessResponse>(`${this.authApiUrl}/init-password-reset`, { email });
  }

  public passwordReset(id: string, newPassword: string, token: string): Observable<IGeneralSuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<IGeneralSuccessResponse>(`${this.authApiUrl}/${id}/reset-password`, { newPassword }, httpOptions);
  }

  public activateUser(userId: string, token: string): Observable<IGeneralSuccessResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    return this.http.post<IGeneralSuccessResponse>(`${this.authApiUrl}/${userId}/activate`, {}, httpOptions);
  }
}
