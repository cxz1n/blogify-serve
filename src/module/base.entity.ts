import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: new Date().valueOf() })
  createtime: string; //创建时间戳

  @Column({ default: new Date().valueOf() })
  updatetime: string; //更新时间戳
}
