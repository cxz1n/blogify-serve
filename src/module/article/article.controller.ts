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
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Request } from 'express';
import { ID } from 'src/decorator/user.decorator';
import { Public } from '../auth/auth.decorator';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @ID() id: string) {
    createArticleDto.uid = id;
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll(@Req() request: Request, @ID() id: string) {
    const uid: string = id;
    return this.articleService.findAll(uid, request.query);
  }

  @Public()
  @Get('/pc')
  findAllOnPc(@Req() request: Request) {
    return this.articleService.findAllOnPc(request.query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOneById(id);
  }

  @Put()
  async update(
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() request: Request,
  ) {
    const article = await this.articleService.findOneById(updateArticleDto.id);
    if (!article[0]) {
      throw new HttpException('该资源不存在', HttpStatus.FORBIDDEN);
    }
    if (article[0].uid === request.user['id']) {
      return this.articleService.update(updateArticleDto);
    } else {
      throw new HttpException('无该资源操作权限', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const article = await this.articleService.findOneById(id);
    if (!article[0]) {
      throw new HttpException('该资源不存在', HttpStatus.FORBIDDEN);
    }
    if (article[0].uid === request.user['id']) {
      return this.articleService.remove(id);
    } else {
      throw new HttpException('无该资源操作权限', HttpStatus.FORBIDDEN);
    }
  }
}
