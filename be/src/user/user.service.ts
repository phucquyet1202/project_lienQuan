import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { customException, customResponse } from 'src/helper/response.helper';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({
        userName: createUserDto.userName,
      });
      if (user) {
        return customException(404, 'Tài khoản đã tồn tại');
      }
      const hashedPass = bcrypt.hashSync(createUserDto.password, 12);
      createUserDto.password = hashedPass;
      const data = await this.userModel.create(createUserDto);
      if (!data) {
        return customException(404, 'Đăng ký thất bại');
      }
      return customResponse(200, 'Đăng ký thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.userModel.find();
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      data.map((item) => {
        item.password = undefined;
        item.role = undefined;
      });
      return customResponse(200, 'Lấy danh sách người dùng thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.userModel.findById(id);
      if (!data) {
        return customException(404, 'Không tìm thấy người dùng');
      }
      data.password = undefined;
      data.role = undefined;
      return customResponse(200, 'Lấy người dùng thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!data) {
        return customException(404, 'Cập nhật người dùng thất bại');
      }
      return customResponse(200, 'Cập nhật người dùng thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Xóa người dùng thất bại');
      }
      return customResponse(200, 'Xóa người dùng thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ userName: username });
    if (user) {
      const hashedPass = this.isValidPass(pass, user.password);
      if (hashedPass === true) {
        user.password = undefined;
        user.role = undefined;
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
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }
}
