import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
