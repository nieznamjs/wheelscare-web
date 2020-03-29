import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public get apiUrl(): string {
    return environment.apiUrl;
  }
}
