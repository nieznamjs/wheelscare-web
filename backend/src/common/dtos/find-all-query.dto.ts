// import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsIn,
  IsString,
  IsOptional,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { findAllQueryOperatorsMap, EQUAL } from '../constants';

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
        validate(value: FindAllQuery[]) {
          if (value.length === 0) { return false; }

          const operatorKeys = Object.keys(findAllQueryOperatorsMap);

          return value.every(val => {
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
  // @ApiModelProperty({ example: [
  //   { firstName: { operator: EQUAL, value: 'Some value like firstName' } },
  //   { firstName: { operator: EQUAL, value: 'Some other value like lastName' } },
  // ]})
  @IsOptional()
  @HasProperQueries()
  public readonly queries: FindAllQuery[];

  // @ApiModelProperty({ example: [ 'Some value', 'Some other value', 'id' ] })
  @IsOptional()
  @IsArray()
  public readonly select: string[];

  // @ApiModelProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  public readonly page: number;

  // @ApiModelProperty({ example: 25 })
  @IsOptional()
  @IsNumber()
  public readonly pageSize: number;

  // @ApiModelProperty({ example: 'DESC' })
  @IsOptional()
  @IsIn(['DESC', 'ASC', 'asc', 'desc'])
  public readonly order: 'DESC'|'ASC';

  // @ApiModelProperty({ example: 'Some value' })
  @IsOptional()
  @IsString()
  public readonly orderBy: string;

  constructor(private data: Partial<FindAllQueryDto>) {
    Object.assign(this, this.data);
  }
}
