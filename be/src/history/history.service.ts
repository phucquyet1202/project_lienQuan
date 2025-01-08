import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './entities/history.entity';
import { customException, customResponse } from 'src/helper/response.helper';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private historyModel: Model<HistoryDocument>,
  ) {}
  async create(createHistoryDto: CreateHistoryDto) {
    try {
      const data = await this.historyModel.create(createHistoryDto);
      if (!data) {
        return customException(404, 'Tạo lịch sử thất bại');
      }
      return customResponse(200, 'Tạo lịch sử thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.historyModel.find();
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
      const data = await this.historyModel.findById(id);
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy dữ liệu thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
  async findHistoryByUser(id: string) {
    try {
      const data = await this.historyModel.findOne({ infoUserId: id });
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy dữ liệu thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    try {
      const data = await this.historyModel
        .findByIdAndUpdate(id, updateHistoryDto, { new: true })
        .populate('cardId infoUserId detailHistoryId');

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
      const data = await this.historyModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Xóa thất bại');
      }
      return customResponse(200, 'Xóa thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
