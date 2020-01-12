import { Injectable } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  constructor(
    private socialAuthService: AuthService,
  ) { }

  public loginWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public loginWithFacebook(): Promise<SocialUser> {
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
