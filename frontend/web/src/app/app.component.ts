import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isUserLogged$: Observable<boolean>;

  constructor(private authFacade: AuthFacade) {}

  public ngOnInit(): void {
    this.isUserLogged$ = this.authFacade.isUserLogged$;
  }
}
