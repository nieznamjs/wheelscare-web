import { Component } from '@angular/core';

import { SocialAuthService } from '@services/data-integration/social-auth.service';

@Component({
  selector: 'wcw-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private socialAuthService: SocialAuthService) {}

  public async loginWithGoogle(): Promise<void> {
    const response = await this.socialAuthService.loginWithGoogle();

    console.warn(response);
  }

  public async loginWithFacebook(): Promise<void> {
    const response = await this.socialAuthService.loginWithFacebook();

    console.warn(response);
  }
}
