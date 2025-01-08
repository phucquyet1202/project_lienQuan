import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardExchangeService } from './card_exchange.service';
import { CreateCardExchangeDto } from './dto/create-card_exchange.dto';
import { UpdateCardExchangeDto } from './dto/update-card_exchange.dto';

@Controller('card-exchange')
export class CardExchangeController {
  constructor(private readonly cardExchangeService: CardExchangeService) {}

  @Post()
  create(@Body() createCardExchangeDto: CreateCardExchangeDto) {
    return this.cardExchangeService.create(createCardExchangeDto);
  }

  @Get()
  findOne() {
    return this.cardExchangeService.findOne();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardExchangeDto: UpdateCardExchangeDto,
  ) {
    return this.cardExchangeService.update(id, updateCardExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardExchangeService.remove(id);
  }
}
