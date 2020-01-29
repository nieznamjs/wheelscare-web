import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';
import { VALID_UUID_REGEX } from '@shared/constants/regexes';

@Component({
  selector: 'wcw-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public success$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    const userId = this.route.snapshot.params.id;
    const token = this.route.snapshot.queryParams.token;

    if (!token || !VALID_UUID_REGEX.test(userId)) {
      this.router.navigate(['auth/login']);
    }

    this.isLoading$ = this.authFacade.isActivatingUser$;
    this.error$ = this.authFacade.activateUserError$;
    this.success$ = this.authFacade.activateUserSuccess$;

    this.authFacade.activateUser(userId, token);
  }
}
