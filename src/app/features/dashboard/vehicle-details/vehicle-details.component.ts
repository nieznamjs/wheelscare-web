import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Vehicle } from '@wheelscare/common';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { ModalService } from '@services/utils/modal.service';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new ReplaySubject(1);

  public vehicle$: Observable<Vehicle>;
  public isLoading: boolean;

  constructor(
    private vehiclesDataService: VehiclesDataService,
    private vehiclesUtilsService: VehiclesUtilsService,
    private modalService: ModalService,
  ) { }

  public ngOnInit(): void {
    this.vehiclesUtilsService.currentVehicleId$
      .pipe(
        filter(id => !!id),
        takeUntil(this.destroy$),
      )
      .subscribe((id: string) => {
        this.vehicle$ = this.vehiclesDataService.getVehicle(id).pipe(
          map(response => {
            this.isLoading = response.loading;
            return response.data?.vehicle;
          }),
          takeUntil(this.destroy$),
        );
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deleteVehicle(vehicle: Vehicle): void {
    this.modalService.openDeleteVehicleConfirmModal({ data: { vehicle }, maxWidth: 500 });
  }

  public editVehicle(vehicle: Vehicle): void {
    this.modalService.openVehicleModal(vehicle);
  }
}
