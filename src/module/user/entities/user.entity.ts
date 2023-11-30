import { BaseEntity } from 'src/module/base.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @Column({ default: '' })
  token: string;

  @Column({})
  username: string; //用户名（登录账号）

  @Column({ default: '' })
  nickname: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  phone: string;

  @Column({
    type: 'varchar',
    name: 'password',
    select: false,
  })
  password: string;
}
