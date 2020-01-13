import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreRoutingModule } from './core-routing.module';
import { RootStoreModule } from '@store/root-store.module';
import { environment } from '@env/environment';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';

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

function provideSocialConfig() {
  return socialLoginConfig;
}

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
      useFactory: provideSocialConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ]
})
export class CoreModule { }
