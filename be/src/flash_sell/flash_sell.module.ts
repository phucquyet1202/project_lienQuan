import { Module } from '@nestjs/common';
import { FlashSellService } from './flash_sell.service';
import { FlashSellController } from './flash_sell.controller';

@Module({
  controllers: [FlashSellController],
  providers: [FlashSellService],
})
export class FlashSellModule {}
