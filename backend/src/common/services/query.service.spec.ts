import { Test } from '@nestjs/testing';

const createQueryBuilderReturnMock = {
  getManyAndCount: jest.fn(async () => [[
    { value: 'test1' },
    { value: 'test2' },
  ], 4 ]),
  select: jest.fn(),
  from: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  offset: jest.fn(),
  where: jest.fn(),
  orWhere: jest.fn(),
};

jest.mock('typeorm', () => ({
  getConnection() {
    return {
      createQueryBuilder() {
        return createQueryBuilderReturnMock;
      },
    };
  },
}));

import { ResponseService } from './response.service';
import { QueryService } from './query.service';
import { FindAllQueryDto } from '@dtos';

describe('QueryService', () => {
  let queryService: QueryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ ResponseService, QueryService ],
    }).compile();

    queryService = module.get<QueryService>(QueryService);
  });

  it('should perform basic query', async () => {
    const entity = class User {};
    const result = await queryService.findAll(entity, new FindAllQueryDto({
      queries: [
        {
          name: { operator: 'EQUAL', value: 'Jasiu'},
          age: { operator: 'LESS_THAN', value: 25 },
        },
        { name: { operator: 'EQUAL', value: 'Andrzej'} },
      ],
      select: ['id', 'name', 'dummy'],
      page: 2,
      pageSize: 10,
      order: 'ASC',
      orderBy: 'name',
    }));

    expect(createQueryBuilderReturnMock.getManyAndCount).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.select).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.from).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.orderBy).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.limit).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.offset).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.where).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderReturnMock.orWhere).toHaveBeenCalledTimes(1);

    expect(createQueryBuilderReturnMock.select).toHaveBeenCalledWith(['User.id', 'User.name', 'User.dummy']);
    expect(createQueryBuilderReturnMock.from).toHaveBeenCalledWith(entity, entity.name);
    expect(createQueryBuilderReturnMock.orderBy).toHaveBeenCalledWith('"name"', 'ASC');
    expect(createQueryBuilderReturnMock.limit).toHaveBeenCalledWith(10);
    expect(createQueryBuilderReturnMock.offset).toHaveBeenCalledWith(10);
    expect(createQueryBuilderReturnMock.where).toHaveBeenCalledWith(
      expect.stringMatching(/User\.name = :.+name AND User\.age < :.+age/),
      expect.anything(),
    );
    expect(createQueryBuilderReturnMock.orWhere).toHaveBeenCalledWith(
      expect.stringMatching(/User\.name = :.+name/),
      expect.anything(),
    );

    expect(result).toEqual({
      data: [
        { value: 'test1' },
        { value: 'test2' },
      ],
      count: 4,
    });
  });
});
