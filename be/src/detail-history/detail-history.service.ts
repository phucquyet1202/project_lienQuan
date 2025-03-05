import { Injectable } from '@nestjs/common';
import { CreateDetailHistoryDto } from './dto/create-detail-history.dto';
import { UpdateDetailHistoryDto } from './dto/update-detail-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  DetailHistory,
  DetailHistoryDocument,
} from './entities/detail-history.entity';
import { Model } from 'mongoose';
import { HistoryService } from 'src/history/history.service';
import { customException, customResponse } from 'src/helper/response.helper';
import { InfoUserService } from 'src/info-user/info-user.service';

@Injectable()
export class DetailHistoryService {
  constructor(
    @InjectModel(DetailHistory.name)
    private detailHistoryModel: Model<DetailHistoryDocument>,
    private historyService: HistoryService,
    private infoUserService: InfoUserService,
  ) {}
  async create(createDetailHistoryDto: CreateDetailHistoryDto) {
    try {
      const detailHistory = await this.detailHistoryModel.create(
        createDetailHistoryDto,
      );
      if (!detailHistory) {
        return customException(404, 'Tạo thất bại');
      }
      const infoUser = await this.infoUserService.findByIdUser(
        createDetailHistoryDto.userId,
      );
      const history = await this.historyService.update(
        infoUser.data._id.toString(),
        { detailHistoryId: detailHistory._id.toString() },
      );
      return customResponse(200, 'Tạo thành công', detailHistory);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.detailHistoryModel.find();
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.detailHistoryModel.findById(id);
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin');
      }
      return customResponse(200, 'Lấy thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateDetailHistoryDto: UpdateDetailHistoryDto) {
    try {
      const data = await this.detailHistoryModel.findByIdAndUpdate(
        id,
        updateDetailHistoryDto,
        { new: true },
      );
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin để cập nhật');
      }
      return customResponse(200, 'Cập nhật thành công', data);
    } catch (error) {
      return customException(500, 'Lôi server', error.message);
    }
  }

  async remove(id: string, idUser: string) {
    try {
      const data = await this.detailHistoryModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin để xóa');
      }
      await this.historyService.update(idUser, {
        deleteDetailHistory: data._id.toString(),
      });
      return customResponse(200, 'Xóa thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
