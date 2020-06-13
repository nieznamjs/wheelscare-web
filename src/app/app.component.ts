import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'wcw-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isUserLogged$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
    private usersDataService: UsersDataService,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    this.isUserLogged$ = this.authFacade.isUserLogged$;

    if (!this.location.path().includes('auth')) {
      this.usersDataService.getMe().subscribe(response => {
        if (response.data) {
          this.authFacade.setUserAsLoggedIn();
        }
      });
    }
  }
}
