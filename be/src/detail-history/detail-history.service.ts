import { Injectable } from '@nestjs/common';
import { CreateDetailHistoryDto } from './dto/create-detail-history.dto';
import { UpdateDetailHistoryDto } from './dto/update-detail-history.dto';

@Injectable()
export class DetailHistoryService {
  create(createDetailHistoryDto: CreateDetailHistoryDto) {
    return 'This action adds a new detailHistory';
  }

  findAll() {
    return `This action returns all detailHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailHistory`;
  }

  update(id: number, updateDetailHistoryDto: UpdateDetailHistoryDto) {
    return `This action updates a #${id} detailHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailHistory`;
  }
}
