import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }
  findUserPassword(username?: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }
  findOne(username?: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where({ username })
      .getOne();
  }
  findOneById(id: string) {
    return this.usersRepository.find({ where: [{ id }] });
  }

  async update(updateUserDto: UpdateUserDto) {
    console.log('updata>>>', updateUserDto);
    const data = await this.usersRepository.update(
      updateUserDto.id,
      updateUserDto,
    );
    console.log(data.affected);
    if (data.affected === 1) {
      const data = await this.findOneById(updateUserDto.id);
      return data[0];
    } else {
      throw new HttpException('修改失败，该用户不存在', HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    const data = await this.usersRepository.delete(id);
    if (data.affected === 1) {
      return '删除成功';
    } else {
      throw new HttpException('删除失败, 该用户不存在', HttpStatus.FORBIDDEN);
    }
  }
}
