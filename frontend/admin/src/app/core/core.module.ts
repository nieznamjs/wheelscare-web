import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootStoreModule } from '@store/root-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';

@NgModule({
  imports: [
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  exports: [
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    StoreDevtoolsModule,
  ],
})
export class CoreModule { }
