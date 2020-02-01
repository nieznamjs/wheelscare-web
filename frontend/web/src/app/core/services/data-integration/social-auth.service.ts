import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  constructor(
    private socialAuthService: AuthService,
  ) {}

  public loginWithGoogle(): Observable<SocialUser> {
    return from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID));
  }

  public loginWithFacebook(): Observable<SocialUser> {
    return from(this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID));
  }
}
