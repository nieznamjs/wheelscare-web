import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InitResetPasswordComponent } from './init-reset-password/init-reset-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthSuccessComponent } from './auth-success/auth-success.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    InitResetPasswordComponent,
    PasswordResetComponent,
    AuthSuccessComponent,
    ActivateAccountComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
