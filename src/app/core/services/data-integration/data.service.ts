import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MutationOptions, QueryOptions } from 'apollo-client';
import { ErrorResponse } from 'apollo-link-error';

import { ErrorMessages } from '@constants';
import { MutationResponse, WatchQueryResponse } from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apollo: Apollo) {
  }

  public watchQuery<T>(options: QueryOptions): Observable<WatchQueryResponse<T>> {
    return new Observable(observer => {
      observer.next({ loading: true });

      this.apollo.watchQuery<T>(options).valueChanges.subscribe(
        ({ data, loading }) => observer.next({ loading, data, errors: null }),
        (errorRes: ErrorResponse) => observer.next({
          loading: false,
          errors:
            [
              ...errorRes.graphQLErrors.map(error => ErrorMessages[error.message] || error.message),
              errorRes.networkError?.message,
            ],
        }),
        () => observer.complete(),
      );
    });
  }

  public mutate<T>(options: MutationOptions<T>): Observable<MutationResponse<T>> {
    return new Observable((observer => {
      observer.next({ loading: true, data: null, errors: null });

      this.apollo.mutate<T>(options).subscribe(
        (data: T) => observer.next({ loading: false, data, errors: null }),
        (error: ErrorResponse) => observer.next({
          loading: false,
          data: null,
          errors: error.graphQLErrors.map(err => ErrorMessages[err.message] || err),
        }),
        () => observer.complete(),
      );
    }));
  }
}
