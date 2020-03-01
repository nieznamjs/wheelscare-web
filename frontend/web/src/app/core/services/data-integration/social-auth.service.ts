import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { IGeneralSuccessResponse } from '@purbanski-deftcode/wc-common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  private readonly authApiUrl = `${this.config.apiUrl}/auth`;

  constructor(
    private socialAuthService: AuthService,
    private httpClient: HttpClient,
    private config: ConfigService,
  ) {}

  public registerViaGoogle(): Observable<IGeneralSuccessResponse> {
    return this.getGoogleToken().pipe(
      switchMap(token => {
        return this.httpClient.post<IGeneralSuccessResponse>(`${this.authApiUrl}/register/google`, { token });
      })
    );
  }

  public loginViaGoogle(): Observable<IGeneralSuccessResponse> {
    return this.getGoogleToken().pipe(
      switchMap(token => {
        return this.httpClient.post<IGeneralSuccessResponse>(`${this.authApiUrl}/login/google`, { token });
      })
    );
  }

  public registerViaFacebook(): Observable<IGeneralSuccessResponse> {
    return this.getFacebookToken().pipe(
      switchMap(token => {
        return this.httpClient.post<IGeneralSuccessResponse>(`${this.authApiUrl}/register/facebook`, { token });
      })
    );
  }

  public loginViaFacebook(): Observable<IGeneralSuccessResponse> {
    return this.getFacebookToken().pipe(
      switchMap(token => {
        return this.httpClient.post<IGeneralSuccessResponse>(`${this.authApiUrl}/login/facebook`, { token });
      })
    );
  }

  private getGoogleToken(): Observable<string> {
    return from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
      map(res => res.idToken)
    );
  }

  private getFacebookToken(): Observable<string> {
    return from(this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)).pipe(
      map(res => res.authToken)
    );
  }
}
