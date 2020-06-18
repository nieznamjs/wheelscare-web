import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'dashboard',
    loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'confirm-vehicle-transfer',
    loadChildren: () => import('../features/confirm-vehicle-transfer/confirm-vehicle-transfer.module')
      .then(m => m.ConfirmVehicleTransferModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class CoreRoutingModule {
}
