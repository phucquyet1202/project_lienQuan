import { Module } from '@nestjs/common';
import { DetailHistoryService } from './detail-history.service';
import { DetailHistoryController } from './detail-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DetailHistory,
  DetailHistorySchema,
} from './entities/detail-history.entity';
import { History, HistorySchema } from 'src/history/entities/history.entity';
import { HistoryService } from 'src/history/history.service';
import {
  InfoUser,
  InfoUserSchema,
} from 'src/info-user/entities/info-user.entity';
import { InfoUserService } from 'src/info-user/info-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetailHistory.name, schema: DetailHistorySchema },
      { name: History.name, schema: HistorySchema },
      { name: InfoUser.name, schema: InfoUserSchema },
    ]),
  ],
  exports: [DetailHistoryService],
  controllers: [DetailHistoryController],
  providers: [DetailHistoryService, HistoryService, InfoUserService],
})
export class DetailHistoryModule {}
