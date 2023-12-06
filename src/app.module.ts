import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entity';
import { Article } from './module/article/entities/article.entity';
import { Tag } from './module/tag/entities/tag.entity';
import { AuthModule } from './module/auth/auth.module';
import { TagModule } from './module/tag/tag.module';
import { ArticleModule } from './module/article/article.module';
import { ArticleTagModule } from './module/article-tag/article-tag.module';
import { ArticleTag } from './module/article-tag/entities/article-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '43.140.243.148',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      // password: 'drowssapon321',
      password: '123456',
      database: 'blog',
      entities: [User, Article, Tag, ArticleTag],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    TagModule,
    ArticleTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
