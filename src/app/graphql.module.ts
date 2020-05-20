import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { environment } from '@env/environment';

const uri = `${environment.apiUrl}/graphql`;

export function createApollo(httpLink: HttpLink) {
  return {
    link: ApolloLink.from([
      // onError(({ graphQLErrors, networkError }) => {
      //   if (graphQLErrors) {
      //     graphQLErrors.forEach(error => {
      //       // TODO add snackbar
      //       console.log(error.message);
      //     });
      //   }
      //
      //   if (networkError) {
      //     console.log(networkError)
      //   }
      // }),
      httpLink.create({ uri, withCredentials: true }),
    ]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ ApolloModule, HttpLinkModule ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [ HttpLink ],
    },
  ],
})
export class GraphQLModule {}
