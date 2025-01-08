import { Injectable } from '@nestjs/common';
import { CreateLogAccDto } from './dto/create-log-acc.dto';
import { UpdateLogAccDto } from './dto/update-log-acc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LogAcc, LogAccDocument } from './entities/log-acc.entity';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';

@Injectable()
export class LogAccService {
  constructor(
    @InjectModel(LogAcc.name)
    private logAccModel: Model<LogAccDocument>,
  ) {}
  async create(createLogAccDto: CreateLogAccDto) {
    try {
      const data = await this.logAccModel.create(createLogAccDto);
      if (!data) {
        return customException(404, 'Tạo logAcc thất bại');
      }
      return customResponse(200, 'Tạo logAcc thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.logAccModel.find();
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy dữ liệu thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.logAccModel.findById(id);
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin');
      }
      return customResponse(200, 'Lấy thông tin thành công', data);
    } catch (error) {
      return customException(500, 'L��i server', error.message);
    }
  }

  async update(id: string, updateLogAccDto: UpdateLogAccDto) {
    try {
      const data = await this.logAccModel.findByIdAndUpdate(
        id,
        updateLogAccDto,
        { new: true },
      );
      if (!data) {
        return customException(404, 'Cập nhật thất bại');
      }
      return customResponse(200, 'Cập nhật thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.logAccModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Xóa thất bại');
      }
      return customResponse(200, 'Xóa thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
