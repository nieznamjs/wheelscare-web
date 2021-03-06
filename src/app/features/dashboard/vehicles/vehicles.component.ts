import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ModalService } from '@services/utils/modal.service';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { IUser, Vehicle } from '@wheelscare/common';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants';
import { BrandsLogosService } from '@services/utils/brands-logos.service';

@Component({
  selector: 'wcw-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  private destroy$ = new ReplaySubject(1);
  private hasNoVehicles = true;

  public me$: Observable<IUser>;
  public selectedVehicleId$: Observable<string>;

  constructor(
    private modalService: ModalService,
    private usersDataService: UsersDataService,
    private vehiclesUtilsService: VehiclesUtilsService,
    private vehiclesDataService: VehiclesDataService,
    private snackbarService: SnackbarService,
    private scrollToService: ScrollToService,
    public brandsLogosService: BrandsLogosService,
  ) { }

  public ngOnInit() {
    this.me$ = this.usersDataService.getMe().pipe(map(response => {
      if (response.data && response.data.me.vehicles.length !== 0) {
        const defaultVehicle = response.data.me.vehicles.find(vehicle => vehicle.default);

        response.data.me.vehicles.sort((a, b) => Number(b.default) - Number(a.default));

        this.selectVehicle(defaultVehicle?.id);
        this.hasNoVehicles = false;
      }

      return response.data?.me;
    }));

    this.selectedVehicleId$ = this.vehiclesUtilsService.currentVehicleId$;
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openAddVehicleModal(): void {
    this.modalService.openVehicleModal({ isCreatingFirstVehicle: this.hasNoVehicles });
  }

  public selectVehicle(id: string): void {
    this.vehiclesUtilsService.setCurrentVehicle(id);

    const currentDeviceWidth = window.innerWidth;

    if (currentDeviceWidth >= 1200) {
      return;
    }

    let offset = -50;

    if (currentDeviceWidth <= 480) {
      offset = -80;
    }

    this.scrollToService.scrollTo({ target: 'vehicle-details', offset });
  }

  public setDefaultVehicle(vehicle: Vehicle): void {
    const updatedVehicle: Partial<Vehicle> = {
      id: vehicle.id,
      default: true,
    };

    this.vehiclesDataService.setDefaultVehicle(updatedVehicle)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.data) {
          this.snackbarService.showSuccess(SnackbarMessages.VehicleSetDefaultSuccessfully);
        }
      });
  }
}
