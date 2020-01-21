import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsString,
  IsOptional,
  registerDecorator,
  ValidationOptions, IsNumberString, IsJSON,
} from 'class-validator';
import { EQUAL, findAllQueryOperatorsMap } from '@constants';

export interface FindAllQuery {
  // key should come from generic value properties, for example for User it should be only like id, email etc.
  [key: string]: {
    operator: string,
    value: string|number|string[]|number[]|null;
  };
}

function HasProperQueries(validationOptions?: ValidationOptions) {
  return (object: FindAllQueryDto, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'hasProperQueries',
      target: object.constructor,
      options: validationOptions,
      validator: {
        defaultMessage() {
          return 'At least one of the queries is wrong';
        },
        validate(value: string) {
          const parsedValue = JSON.parse(value);

          if (parsedValue.length === 0) { return false; }

          const operatorKeys = Object.keys(findAllQueryOperatorsMap);

          return parsedValue.every(val => {
            const keys = Object.keys(val);

            if (keys.length === 0) { return false; }

            return keys.every(key => {
              const operator = val[key].operator;
              const queryValue = val[key].value;

              return queryValue !== undefined && operatorKeys.includes(operator);
            });
          });
        },
      },
    });
  };
}

export class FindAllQueryDto {
  @ApiProperty({ example: [
    { firstName: { operator: EQUAL, value: 'Some value like firstName' } },
    { firstName: { operator: EQUAL, value: 'Some other value like lastName' } },
  ]})
  @IsOptional()
  @IsJSON()
  @HasProperQueries()
  public readonly queries: FindAllQuery[];

  @ApiProperty({ example: [ 'Some value', 'Some other value', 'id' ] })
  @IsOptional()
  @IsArray()
  public readonly select: string[];

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumberString()
  public readonly page: number;

  @ApiProperty({ example: 25 })
  @IsOptional()
  @IsNumberString()
  public readonly pageSize: number;

  @ApiProperty({ example: 'DESC' })
  @IsOptional()
  @IsIn(['DESC', 'ASC', 'asc', 'desc'])
  public readonly order: 'DESC'|'ASC';

  @ApiProperty({ example: 'Some value' })
  @IsOptional()
  @IsString()
  public readonly orderBy: string;

  constructor(private data: Partial<FindAllQueryDto>) {
    Object.assign(this, this.data);
  }
}
