import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Vehicle } from '@wheelscare/common';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle$: Observable<Vehicle>;

  constructor(private vehiclesDataService: VehiclesDataService) { }

  public ngOnInit(): void {
    this.vehicle$ = this.vehiclesDataService.currentVehicle$;
  }
}
