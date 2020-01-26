import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@services/utils/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private readonly usersApiUrl = `${this.config.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  public initPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.usersApiUrl}/init-password-reset`, { email });
  }
}
