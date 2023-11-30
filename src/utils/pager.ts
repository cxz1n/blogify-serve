import { SelectQueryBuilder } from 'typeorm';

export class Pagination {
  private pageNum: number;

  private pageSize: number;

  private totalNum: number;

  private totalRows: number;

  public data?: any[];

  public static async findByPage(
    queryBuilder: SelectQueryBuilder<any>,
    pageHelper?: { pageNum: number; pageSize: number },
  ): Promise<Pagination> {
    const pagination = new Pagination();
    pagination.totalRows = await queryBuilder.getCount();
    pagination.pageNum = pageHelper.pageNum * 1;
    pagination.pageSize = pageHelper.pageSize * 1;
    pagination.totalNum = Math.ceil(pagination.totalRows / pageHelper.pageSize);
    pagination.data = await queryBuilder
      .skip(pageHelper.pageSize * (pageHelper.pageNum - 1))
      .take(pageHelper.pageSize)
      .getMany();
    return pagination;
  }
}
