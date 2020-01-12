import { Component } from '@angular/core';
import { SocialAuthService } from '@services/social-auth.service';

@Component({
  selector: 'wcw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

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
