import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MutationResponse } from '@shared/interfaces/data.interface';
import { MutationOptions } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apollo: Apollo) {}

  public mutate<T>(options: MutationOptions<T>): Observable<MutationResponse<T>> {
    return new Observable((observer => {
      observer.next({ loading: true, data: null, error: null });

      this.apollo.mutate<T>(options).subscribe(
        (data: T) => observer.next({ loading: false, data, error: null }),
        error => observer.next({ loading: false, data: null, error: error.graphQLErrors[0].message }),
        () => observer.complete(),
      );
    }));
  }
}
