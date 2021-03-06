import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { HttpConfigInterceptor } from '@interceptors/http-config.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import { RootStoreModule } from '@store/root-store.module';
import { environment } from '@env/environment';

const socialLoginConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleClientId),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookAppId),
  }
]);

@NgModule({
  imports: [
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    SocialLoginModule,
    HttpClientModule,
  ],
  exports: [
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    StoreDevtoolsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: () => socialLoginConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
  ]
})
export class CoreModule { }
