import { Injectable } from '@nestjs/common';
import { CreateFlashSellDto } from './dto/create-flash_sell.dto';
import { UpdateFlashSellDto } from './dto/update-flash_sell.dto';

@Injectable()
export class FlashSellService {
  create(createFlashSellDto: CreateFlashSellDto) {
    return 'This action adds a new flashSell';
  }

  findAll() {
    return `This action returns all flashSell`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flashSell`;
  }

  update(id: number, updateFlashSellDto: UpdateFlashSellDto) {
    return `This action updates a #${id} flashSell`;
  }

  remove(id: number) {
    return `This action removes a #${id} flashSell`;
  }
}
