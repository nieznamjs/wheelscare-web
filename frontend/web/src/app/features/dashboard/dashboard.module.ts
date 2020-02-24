import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [DashboardComponent, VehiclesComponent, EventsComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
