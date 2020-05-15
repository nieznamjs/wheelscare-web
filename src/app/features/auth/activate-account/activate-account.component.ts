import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { ErrorMessages } from '@constants';

@Component({
  selector: 'wcw-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public success$: Observable<boolean>;
  public idOrTokenError: string;

  constructor(
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const userId = this.route.snapshot.params.id;
    const token = this.route.snapshot.queryParams.token;

    // TODO test user id `|| !VALID_UUID_REGEX.test(userId)`
    if (!token) {
      this.idOrTokenError = ErrorMessages.CannotActivateUser;
      return;
    }

    this.isLoading$ = this.authFacade.isActivatingUser$;
    this.error$ = this.authFacade.activateUserError$;
    this.success$ = this.authFacade.activateUserSuccess$;

    this.authFacade.activateUser(userId, token);
  }
}
