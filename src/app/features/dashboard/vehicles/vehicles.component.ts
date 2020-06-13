import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalService } from '@services/utils/modal.service';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { IUser, Vehicle } from '@wheelscare/common';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  public me$: Observable<IUser>;
  public selectedVehicleId$: Observable<string>;

  constructor(
    private modalService: ModalService,
    private usersDataService: UsersDataService,
    private vehiclesUtilsService: VehiclesUtilsService,
    private vehiclesDataService: VehiclesDataService,
  ) { }

  public ngOnInit() {
    this.me$ = this.usersDataService.getMe().pipe(map(response => {
      const defaultVehicle = response.data?.me.vehicles.find(vehicle => vehicle.default);

      response.data?.me.vehicles.sort((a, b) => Number(b.default) - Number(a.default));

      this.selectVehicle(defaultVehicle?.id);

      return response.data?.me;
    }));

    this.selectedVehicleId$ = this.vehiclesUtilsService.currentVehicleId$;
  }

  public openAddVehicleModal(): void {
    this.modalService.openVehicleModal();
  }

  public selectVehicle(id: string): void {
    this.vehiclesUtilsService.setCurrentVehicle(id);
  }

  public setDefaultVehicle(vehicle: Vehicle): void {
    vehicle.default = true;

    this.vehiclesDataService.setDefaultVehicle(vehicle);
  }
}
