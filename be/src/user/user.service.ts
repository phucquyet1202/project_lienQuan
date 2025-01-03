import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    try {
      // const user = await this.userModel.findOne({ name });
    } catch (error) {
      throw new InternalServerErrorException('Lỗi server');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    // console.log(user);

    if (user) {
      const hashedPass = this.isValidPass(pass, user.password);
      if (hashedPass === true) {
        return user;
      }
    }
    return null;
  }
  isValidPass(pass: string, hashedPass: string): boolean {
    return bcrypt.compareSync(pass, hashedPass);
  }
  async login(user: any) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
