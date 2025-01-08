import { PartialType } from '@nestjs/mapped-types';
import { CreateCardExchangeDto } from './create-card_exchange.dto';

export class UpdateCardExchangeDto extends PartialType(CreateCardExchangeDto) {}
