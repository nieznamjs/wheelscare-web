import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Vehicle } from '@wheelscare/common';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { ModalService } from '@services/utils/modal.service';

@Component({
  selector: 'wcw-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle$: Observable<Vehicle>;

  constructor(
    private vehiclesUtilsService: VehiclesUtilsService,
    private modalService: ModalService,
  ) { }

  public ngOnInit(): void {
    this.vehicle$ = this.vehiclesUtilsService.currentVehicle$;
  }

  public deleteVehicle(vehicle: Vehicle): void {
    this.modalService.openDeleteVehicleConfirmModal({ data: { vehicle }, maxWidth: 500 });
  }

  public editVehicle(vehicle: Vehicle): void {
    this.modalService.openVehicleModal(vehicle);
  }
}
