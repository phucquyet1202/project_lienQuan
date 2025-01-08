import { Module } from '@nestjs/common';
import { LogAccService } from './log-acc.service';
import { LogAccController } from './log-acc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogAcc, LogAccSchema } from './entities/log-acc.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogAcc.name, schema: LogAccSchema }]),
  ],
  controllers: [LogAccController],
  providers: [LogAccService],
  exports: [LogAccService],
})
export class LogAccModule {}
