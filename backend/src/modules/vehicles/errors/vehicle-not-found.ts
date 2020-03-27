import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

export class VehicleNotFoundError extends HttpException {
  constructor() {
    super(ApiErrors.VehicleNotFound, HttpStatus.NOT_FOUND);
  }
}
