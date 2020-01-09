import { Injectable } from '@nestjs/common';
import { getConnection, SelectQueryBuilder } from 'typeorm';

import { ResponseService } from './response.service';
import { FindAllQuery, FindAllQueryDto } from '@dtos';
import { ReadAllResponse } from '@interfaces';
import { findAllQueryOperatorsMap } from '@constants';

interface WhereClauseParams {
  [key: string]: number|number[]|boolean|string|string[];
}

@Injectable()
export class QueryService {
  private readonly DEFAULT_PAGE_SIZE = 25;
  private readonly DEFAULT_PAGE = 0;

  constructor(private responseService: ResponseService) {}

  public async findAll<T>(entity: new () => T, findAllQueryDto: FindAllQueryDto): Promise<ReadAllResponse<T>> {
    let query: SelectQueryBuilder<T> = getConnection().createQueryBuilder();

    query = this.addSelectClause<T>(entity, findAllQueryDto, query);
    query = this.addFromClause<T>(entity, query);
    query = this.addWhereClauses<T>(entity.name, query, findAllQueryDto);
    query = this.addOrderClauses<T>(query, findAllQueryDto);
    query = this.addPaginationClauses<T>(query, findAllQueryDto);

    const res = await query.getManyAndCount();

    return this.responseService.formatFindAllResponse<T>(res);
  }

  private addFromClause<T>(entity: new () => T, query: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    query.from(entity, entity.name);
    return query;
  }

  private addSelectClause<T>(entity: new () => T, findAllQueryDto: FindAllQueryDto, query: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    if (findAllQueryDto.select && findAllQueryDto.select.length > 0) {
      query.select(findAllQueryDto.select.map(prop => `${entity.name}.${prop}`));
    } else {
      query.select(entity.name);
    }

    return query;
  }

  private addOrderClauses<T>(query: SelectQueryBuilder<T>, findAllQueryDto: FindAllQueryDto): SelectQueryBuilder<T> {
     if (findAllQueryDto.order && findAllQueryDto.orderBy) {
       query.orderBy(`"${findAllQueryDto.orderBy}"`, findAllQueryDto.order.toUpperCase() as 'ASC'|'DESC');
     }

     return query;
  }

  private addPaginationClauses<T>(query: SelectQueryBuilder<T>, findAllQueryDto: FindAllQueryDto): SelectQueryBuilder<T> {
    const skipValue = (findAllQueryDto.page - 1 || this.DEFAULT_PAGE) * (findAllQueryDto.pageSize || this.DEFAULT_PAGE_SIZE);
    const pageSize = findAllQueryDto.pageSize || this.DEFAULT_PAGE_SIZE;

    query.offset(skipValue);
    query.limit(pageSize);

    return query;
  }

  private addWhereClauses<T>(entityName: string, query: SelectQueryBuilder<T>, findAllQueryDto: FindAllQueryDto): SelectQueryBuilder<T> {
    if (!findAllQueryDto.queries) { return query; }

    findAllQueryDto.queries.forEach((singleQuery: FindAllQuery, idx: number) => {
      const randomPrefix = (Math.random() + 1).toString(36).substring(7);

      if (idx === 0) {
        query.where(this.buildWhereClauseString(entityName, singleQuery, randomPrefix), this.buildWhereClauseParams(singleQuery, randomPrefix));
      } else {
        query.orWhere(this.buildWhereClauseString(entityName, singleQuery, randomPrefix), this.buildWhereClauseParams(singleQuery, randomPrefix));
      }
    });

    return query;
  }

  private buildWhereClauseString(entityName: string, query: FindAllQuery, paramPrefix: string): string {
    const keys = Object.keys(query);
    const atoms = keys.map(key => {
      const operator = findAllQueryOperatorsMap[query[key].operator];
      return `${entityName}.${key} ${operator} :${paramPrefix + key}`;
    });

    return atoms.join(' AND ');
  }

  private buildWhereClauseParams(query: FindAllQuery, paramPrefix: string): WhereClauseParams {
    const keys = Object.keys(query);
    return keys.reduce((container: WhereClauseParams, key: string) => {
      container[paramPrefix + key] = query[key].value;

      return container;
    }, {});
  }
}
