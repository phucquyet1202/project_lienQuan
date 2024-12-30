import { Module } from '@nestjs/common';
import { DetailHistoryService } from './detail-history.service';
import { DetailHistoryController } from './detail-history.controller';

@Module({
  controllers: [DetailHistoryController],
  providers: [DetailHistoryService],
})
export class DetailHistoryModule {}
