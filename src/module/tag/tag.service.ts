import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/utils/pager';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    return this.tagRepository.save(createTagDto);
  }

  findAll(uid: string, query: any) {
    const queryBuilder = this.tagRepository
      .createQueryBuilder('tag')
      .where({ uid });
    return Pagination.findByPage(queryBuilder, query);
  }

  findOneById(id: string) {
    return this.tagRepository.find({ where: [{ id }] });
  }

  update(updateTagDto: UpdateTagDto) {
    return this.tagRepository.update(updateTagDto.id, updateTagDto);
  }

  remove(id: string) {
    return this.tagRepository.delete(id);
  }
}
