import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

import { environment } from '@env/environment';
import { onError } from 'apollo-link-error';
import { AuthFacade } from '@store/auth-store';
import { ApiErrors } from '@wheelscare/common';

const uri = `${environment.apiUrl}/graphql`;

export function createApollo(httpLink: HttpLink, authFacade: AuthFacade) {
  return {
    link: ApolloLink.from([
      onError(error => {
        error.graphQLErrors?.forEach(graphqlError => {
          if (graphqlError.message === ApiErrors.InvalidToken) {
            authFacade.logout();
          }
        });
      }),
      httpLink.create({ uri, withCredentials: true }),
    ]),
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id,
    }),
  };
}

@NgModule({
  exports: [ ApolloModule, HttpLinkModule ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [ HttpLink, AuthFacade ],
    },
  ],
})
export class GraphQLModule {}
