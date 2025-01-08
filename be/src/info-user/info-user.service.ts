import { Injectable } from '@nestjs/common';
import { CreateInfoUserDto } from './dto/create-info-user.dto';
import { UpdateInfoUserDto } from './dto/update-info-user.dto';
import { InfoUser, InfoUserDocument } from './entities/info-user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';

@Injectable()
export class InfoUserService {
  constructor(
    @InjectModel(InfoUser.name)
    private infoUserModel: Model<InfoUserDocument>,
  ) {}
  async create(createInfoUserDto: CreateInfoUserDto) {
    try {
      const data = await this.infoUserModel.create(createInfoUserDto);
      if (!data) {
        return customException(404, 'Tạo thông tin thất bại');
      }
      return customResponse(200, 'Tạo thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.infoUserModel.find();
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin');
      }
      return customResponse(200, 'Lấy thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.infoUserModel.findById(id);
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin');
      }
      return customResponse(200, 'Lấy thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
  async findByIdUser(id: string) {
    try {
      const data = await this.infoUserModel.findOne({ userId: id });
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin');
      }
      return customResponse(200, 'Lấy thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateInfoUserDto: UpdateInfoUserDto) {
    try {
      const data = await this.infoUserModel.findByIdAndUpdate(
        id,
        {
          ...updateInfoUserDto,
          $inc: { amount: Number(updateInfoUserDto.amount) }, // Tăng amount bằng số tiền nạp vào
        },
        { new: true },
      );
      if (!data) {
        return customException(404, 'Cập nhật thông tin thất bại');
      }
      return customResponse(200, 'Cập nhật thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.infoUserModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Xóa thông tin thất bại');
      }
      return customResponse(200, 'Xóa thông tin thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
