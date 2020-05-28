import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalService } from '@services/utils/modal.service';
import { AddVehicleModalComponent } from '@shared/components/modals/add-vehicle-modal/add-vehicle-modal.component';
import { UsersDataService } from '@services/data-integration/users-data.service';
import { IUser } from '@wheelscare/common';

@Component({
  selector: 'wcw-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  public me$: Observable<IUser>;
  public config = {};

  constructor(
    private modalService: ModalService,
    private usersDataService: UsersDataService,
  ) { }

  public ngOnInit() {
    this.me$ = this.usersDataService.getMe().pipe(map(response => response.data?.me ));
  }

  public openAddVehicleModal(): void {
    this.modalService.open(AddVehicleModalComponent, { disableClose: true });
  }
}
