import { BaseEntity } from 'src/module/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @Column({ type: 'uuid' })
  uid: string;

  @Column({ default: '' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'char', default: 0 })
  status: number;
}
