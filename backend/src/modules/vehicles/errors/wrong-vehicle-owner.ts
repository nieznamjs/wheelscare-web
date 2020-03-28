import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

export class WrongVehicleOwnerError extends HttpException {
  constructor() {
    super(ApiErrors.WrongVehicleOwner, HttpStatus.FORBIDDEN);
  }
}
