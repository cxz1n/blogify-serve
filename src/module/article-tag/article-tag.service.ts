import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleTagDto } from './dto/create-article-tag.dto';
import { UpdateArticleTagDto } from './dto/update-article-tag.dto';
import { ArticleTag } from './entities/article-tag.entity';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(ArticleTag)
    private articleTagRepository: Repository<ArticleTag>,
  ) {}

  create(createArticleTagDto: CreateArticleTagDto) {
    return this.articleTagRepository.save(createArticleTagDto);
  }

  findAll() {
    return `This action returns all articleTag`;
  }

  findOneByArticleId(tagId: string) {
    return this.articleTagRepository.find({ where: [{ tagId }] });
  }

  async update(id: number, updateArticleTagDto: UpdateArticleTagDto) {
    const data = await this.articleTagRepository.update(
      updateArticleTagDto.id,
      updateArticleTagDto,
    );
    if (data.affected === 1) {
      data['message'] = '修改成功';
      return data;
    } else {
      throw new HttpException('修改失败', HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    const data = await this.articleTagRepository.delete(id);
    if (data.affected === 1) {
      data['message'] = '删除成功';
      return data;
    } else {
      throw new HttpException('删除成功', HttpStatus.FORBIDDEN);
    }
  }
}
