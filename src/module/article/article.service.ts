import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/utils/pager';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}
  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(createArticleDto);
  }

  async findAllOnPc(query: any) {
    return this.findAll(query.uid, query)
  }
  async findAll(uid: string, query: any) {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect(
        'article_tag',
        'articleTag',
        'articleTag.article_id = article.id',
      )
      .leftJoinAndMapMany(
        'article.tag',
        'tag',
        'tag',
        'articleTag.tag_id = tag.id',
      )
      .where({ uid, status: query.status });
    const pagination = Pagination.findByPage(queryBuilder, query);
    return pagination;
  }

  findOneById(id: string) {
    return this.articleRepository.find({ where: [{ id }] });
  }

  async update(updateArticleDto: UpdateArticleDto) {
    const data = await this.articleRepository.update(
      updateArticleDto.id,
      updateArticleDto,
    );
    if (data.affected === 1) {
      data['message'] = '修改成功';
      return data;
    } else {
      throw new HttpException('修改失败', HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    const data = await this.articleRepository.delete(id);
    if (data.affected === 1) {
      data['message'] = '删除成功';
      return data;
    } else {
      throw new HttpException('删除失败', HttpStatus.FORBIDDEN);
    }
  }
}
