import { Component } from '@angular/core';
import { ModalService } from '@services/utils/modal.service';
import { AddVehicleModalComponent } from '@shared/components/modals/add-vehicle-modal/add-vehicle-modal.component';

@Component({
  selector: 'wcw-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  constructor(private modalService: ModalService) { }

  public openAddVehicleModal(): void {
    const modalRef = this.modalService.open(AddVehicleModalComponent, { disableClose: true });
  }
}
