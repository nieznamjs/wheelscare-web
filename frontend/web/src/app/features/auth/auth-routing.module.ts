import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InitResetPasswordComponent } from './init-reset-password/init-reset-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'init-password-reset', component: InitResetPasswordComponent },
      { path: 'password-reset', component: PasswordResetComponent },
      { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
