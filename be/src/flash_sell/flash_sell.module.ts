import { Module } from '@nestjs/common';
import { FlashSellService } from './flash_sell.service';
import { FlashSellController } from './flash_sell.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSell, FlashSellSchema } from './entities/flash_sell.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlashSell.name, schema: FlashSellSchema },
    ]),
  ],
  controllers: [FlashSellController],
  providers: [FlashSellService],
  exports: [FlashSellService],
})
export class FlashSellModule {}
