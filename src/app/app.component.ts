import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthFacade } from '@store/auth-store';

@Component({
  selector: 'wcw-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isUserLogged$: Observable<boolean>;

  constructor(private authFacade: AuthFacade, private apollo: Apollo) {}

  public ngOnInit(): void {
    this.isUserLogged$ = this.authFacade.isUserLogged$;

    const query = gql`
      {
        me {
          id,
          email,
          vehicles {
            id,
            brand,
            model,
          },
        },
      },
    `;

    this.apollo.watchQuery({ query }).valueChanges.subscribe(console.log)
  }
}
