import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/module/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'uuid' })
  uid: string;

  @Column({ default: '' })
  name: string;
}
