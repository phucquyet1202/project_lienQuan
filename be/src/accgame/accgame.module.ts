import { Module } from '@nestjs/common';
import { AccgameService } from './accgame.service';
import { AccgameController } from './accgame.controller';

@Module({
  controllers: [AccgameController],
  providers: [AccgameService],
})
export class AccgameModule {}
