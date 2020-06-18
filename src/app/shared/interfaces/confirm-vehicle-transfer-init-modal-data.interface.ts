import { InitVehicleTransferBody } from '@interfaces';
import { Vehicle } from '@wheelscare/common';

export interface ConfirmVehicleTransferInitModalData {
  body: InitVehicleTransferBody;
  vehicle: Vehicle;
}
