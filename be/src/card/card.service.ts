import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDucument } from './entities/card.entity';
import { Model } from 'mongoose';
import axios from 'axios';
import { HistoryService } from 'src/history/history.service';
import { CardExchangeService } from 'src/card_exchange/card_exchange.service';
import { customException, customResponse } from 'src/helper/response.helper';
import { InfoUserService } from 'src/info-user/info-user.service';
import { checkCard } from './validators/check-card';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name)
    private cardModel: Model<CardDucument>,
    private historyService: HistoryService,
    private cardExchangeService: CardExchangeService,
    private infoUserService: InfoUserService,
  ) {}
  async create(createCardDto: CreateCardDto) {
    try {
      const card = await this.cardExchangeService.findOne();
      const status = await checkCard({ card, createCardDto });
      const cardData = {
        pin: createCardDto.pin,
        amount: createCardDto.amount,
        seri: createCardDto.seri,
        status: true,
      };
      if (status.statusCode === 200) {
        const changeCard = await this.cardModel.findOne({
          infoUserId: createCardDto.infoUserId,
        });
        if (changeCard) {
          await this.cardModel.findOneAndUpdate(
            { infoUserId: changeCard.infoUserId },
            { $push: { card: cardData } },
            { new: true },
          );
        }
        const data = await this.cardModel.create(createCardDto);
        const history = await this.historyService.findHistoryByUser(
          createCardDto.infoUserId,
        );
        await this.infoUserService.update(createCardDto.infoUserId, {
          amount: Number(createCardDto.amount),
        });
        if (!history) {
          await this.historyService.create({
            infoUserId: createCardDto.infoUserId,
            cardId: data._id.toString(),
          });
        }
        await this.historyService.update(history.data._id, {
          cardId: data._id.toString(),
        });
        if (!data) {
          return customException(404, 'Nạp thẻ thất bại');
        }
        return customResponse(200, 'Nạp thẻ thành công');
      }
      return customException(404, 'Nạp thẻ thất bại');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const cards = await this.cardModel.find().exec();
      if (!cards) {
        return customException(404, 'Không tìm thấy thấy dữ liệu');
      }
      return customResponse(200, 'Lấy danh sách thành công', cards);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: number) {
    try {
      const card = await this.cardModel.findById(id).exec();
      if (!card) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy thông tin thành công', card);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    try {
      const data = await this.cardModel.findByIdAndUpdate(id, updateCardDto, {
        new: true,
      });
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Cập nhật thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.cardModel.findByIdAndDelete(id);
      return customResponse(200, 'Xoá dữ liệu thanh công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
