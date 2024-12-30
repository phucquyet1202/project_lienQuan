import { Module } from '@nestjs/common';
import { LogAccService } from './log-acc.service';
import { LogAccController } from './log-acc.controller';

@Module({
  controllers: [LogAccController],
  providers: [LogAccService],
})
export class LogAccModule {}
