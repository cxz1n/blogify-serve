import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Request } from 'express';
import { ID } from 'src/decorator/user.decorator';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @Req() request: Request) {
    const uid = request.user['id'];
    createTagDto.uid = uid;
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll(@Req() request: Request, @ID() id: string) {
    const uid = id;
    return this.tagService.findAll(uid, request.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOneById(id);
  }

  @Put()
  async update(@Body() updateTagDto: UpdateTagDto, @Req() request: Request) {
    const tag = await this.tagService.findOneById(updateTagDto.id);
    if (!tag[0]) {
      throw new HttpException('该资源不存在', HttpStatus.FORBIDDEN);
    }
    if (tag[0].uid === request.user['id']) {
      return this.tagService.update(updateTagDto);
    } else {
      throw new HttpException('无该资源操作权限', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const tag = await this.tagService.findOneById(id);
    if (!tag[0]) {
      throw new HttpException('该资源不存在', HttpStatus.FORBIDDEN);
    }
    if (tag[0].uid === request.user['id']) {
      return this.tagService.remove(id);
    } else {
      throw new HttpException('无该资源操作权限', HttpStatus.FORBIDDEN);
    }
  }
}
