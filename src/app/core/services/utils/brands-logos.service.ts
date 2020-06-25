import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsLogosService {
  public getBrandLogoPath(name: string): Observable<string> {
    return of(`/assets/images/icons/brands/${name}.svg`);
  }
}
