import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getBcryptHash, matchPwd } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const findPassword = await this.userService.findUserPassword(username);
    if (!user) {
      throw new HttpException('用户不存在！', HttpStatus.FORBIDDEN);
    } else {
      const match = await matchPwd(password, findPassword.password);
      if (match) {
        return user;
      } else {
        throw new HttpException('密码错误', HttpStatus.FORBIDDEN);
      }
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    user.token = this.jwtService.sign(payload);
    return user;
  }

  async register(user: User) {
    const one = await this.userService.findOne(user.username);
    if (one) {
      throw new HttpException('账号已存在', HttpStatus.FORBIDDEN);
    } else {
      user.password = await getBcryptHash(user.password);
      await this.userService.create(user);
      return await this.userService.findOne(user.username);
    }
  }
}
