import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './entities/card.entity';
import { History, HistorySchema } from 'src/history/entities/history.entity';
import {
  CardExchange,
  CardExchangeSchema,
} from 'src/card_exchange/entities/card_exchange.entity';
import { CardExchangeService } from 'src/card_exchange/card_exchange.service';
import { HistoryService } from 'src/history/history.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import {
  InfoUser,
  InfoUserSchema,
} from 'src/info-user/entities/info-user.entity';
import { InfoUserService } from 'src/info-user/info-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: History.name, schema: HistorySchema },
      { name: CardExchange.name, schema: CardExchangeSchema },
      { name: InfoUser.name, schema: InfoUserSchema },
    ]),
    UserModule,
  ],
  controllers: [CardController],
  providers: [
    CardService,
    CardExchangeService,
    HistoryService,
    JwtService,
    InfoUserService,
  ],
  exports: [CardService],
})
export class CardModule {}
