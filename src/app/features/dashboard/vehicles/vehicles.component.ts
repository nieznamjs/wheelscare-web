import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalService } from '@services/utils/modal.service';
import { AddVehicleModalComponent } from '@shared/components/modals/add-vehicle-modal/add-vehicle-modal.component';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { IUser, Vehicle } from '@wheelscare/common';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  public me$: Observable<IUser>;
  public selectedVehicle$: Observable<Vehicle>;

  constructor(
    private modalService: ModalService,
    private usersDataService: UsersDataService,
    private vehiclesDataService: VehiclesDataService,
  ) { }

  public ngOnInit() {
    this.me$ = this.usersDataService.getMe().pipe(map(response => {
      // TODO add 'default' attribute and use it later
      this.selectVehicle(response.data?.me.vehicles[0]);
      return response.data?.me;
    }));

    this.selectedVehicle$ = this.vehiclesDataService.currentVehicle$;
  }

  public openAddVehicleModal(): void {
    this.modalService.open(AddVehicleModalComponent, { disableClose: true });
  }

  public selectVehicle(vehicle: Vehicle): void {
    this.vehiclesDataService.setCurrentVehicle(vehicle);
  }
}
