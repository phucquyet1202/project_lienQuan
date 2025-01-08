import { Injectable } from '@nestjs/common';
import { CreateCardExchangeDto } from './dto/create-card_exchange.dto';
import { UpdateCardExchangeDto } from './dto/update-card_exchange.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CardExchange } from './entities/card_exchange.entity';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';

@Injectable()
export class CardExchangeService {
  constructor(
    @InjectModel(CardExchange.name)
    private cardExchangeModel: Model<CardExchange>,
  ) {}
  async create(createCardExchangeDto: CreateCardExchangeDto) {
    try {
      const data = await this.cardExchangeModel.create(createCardExchangeDto);
      if (!data) {
        return customException(404, 'Tạo thất bại');
      }
      return customResponse(200, 'Tạo thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne() {
    try {
      const data = await this.cardExchangeModel.findOne();
      if (!data) {
        return customException(404, 'Không tìm thấy thông tin');
      }
      return customResponse(200, 'Lấy thông tin thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateCardExchangeDto: UpdateCardExchangeDto) {
    try {
      const data = await this.cardExchangeModel.findByIdAndUpdate(
        id,
        updateCardExchangeDto,
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
      const data = await this.cardExchangeModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Xóa thất bại');
      }
      return customResponse(200, 'Xóa thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
