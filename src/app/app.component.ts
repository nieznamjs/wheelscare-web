import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { UsersDataService } from '@services/data-integration/users-data.service';

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
  ) {}

  public ngOnInit(): void {
    this.isUserLogged$ = this.authFacade.isUserLogged$;

    this.usersDataService.getMe().subscribe();
  }
}
