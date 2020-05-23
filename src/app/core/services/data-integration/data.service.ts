import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MutationOptions } from 'apollo-client';

import { MutationResponse } from '@shared/interfaces/data.interface';
import { ErrorMessages } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apollo: Apollo) {}

  public mutate<T>(options: MutationOptions<T>): Observable<MutationResponse<T>> {
    return new Observable((observer => {
      observer.next({ loading: true, data: null, errors: null });

      this.apollo.mutate<T>(options).subscribe(
        (data: T) => observer.next({ loading: false, data, errors: null }),
        error => observer.next({
          loading: false,
          data: null,
          errors: error.graphQLErrors.map(err => ErrorMessages[err.message] || err),
        }),
        () => observer.complete(),
      );
    }));
  }
}
