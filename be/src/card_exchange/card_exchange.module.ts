import { Module } from '@nestjs/common';
import { CardExchangeService } from './card_exchange.service';
import { CardExchangeController } from './card_exchange.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CardExchange,
  CardExchangeSchema,
} from './entities/card_exchange.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CardExchange.name, schema: CardExchangeSchema },
    ]),
  ],
  exports: [CardExchangeService],
  controllers: [CardExchangeController],
  providers: [CardExchangeService],
})
export class CardExchangeModule {}
