import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authReducer } from './auth-reducer';
import { AuthEffects } from './auth-effects';
import { AuthFacade } from './auth-facade';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([ AuthEffects ]),
  ],
  providers: [
    AuthEffects,
    AuthFacade,
  ],
})
export class AuthStoreModule { }
