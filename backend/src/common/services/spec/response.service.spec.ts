import { ResponseService } from '@services';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(() => {
    service = new ResponseService();
  });

  it('should format find all response', () => {
    const response: [string[], number] = [[ 'test1', 'test2' ], 24];
    const result = service.formatFindAllResponse<string>(response);

    expect(result.data[1]).toEqual('test2');
    expect(result.count).toEqual(24);
  });
});
