import { Component } from '@angular/core';

import { SocialAuthService } from '@services/data-integration/social-auth.service';

@Component({
  selector: 'wcw-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private socialAuthService: SocialAuthService) {}

  public loginWithGoogle(): void {
    this.socialAuthService.loginWithGoogle().subscribe(response => {
      throw new Error('Implement me motherfucker!');
    });
  }

  public loginWithFacebook(): void {
    this.socialAuthService.loginWithFacebook().subscribe(response => {
      throw new Error('Implement me motherfucker!');
    });
  }
}
