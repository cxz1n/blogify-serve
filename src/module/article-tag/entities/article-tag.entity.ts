import { BaseEntity } from 'src/module/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ArticleTag extends BaseEntity {
  @Column({ type: 'uuid', name: 'article_id' })
  articleId: string;

  @Column({ type: 'uuid', name: 'tag_id' })
  tagId: string;
}
