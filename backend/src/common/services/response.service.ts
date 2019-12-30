import { Injectable } from '@nestjs/common';
import { ReadAllResponse } from '../interfaces/read-all-response.interface';

@Injectable()
export class ResponseService {
  public formatFindAllResponse<T>(data: [T[], number]): ReadAllResponse<T> {
    return { data: data[0], count: data[1] };
  }
}
