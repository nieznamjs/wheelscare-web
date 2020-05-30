import { Component } from '@angular/core';

import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private authFacade: AuthFacade) { }

  public logout(): void {
    this.authFacade.logout();
  }
}
