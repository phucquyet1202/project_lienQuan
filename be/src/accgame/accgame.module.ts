import { forwardRef, Module } from '@nestjs/common';
import { AccgameService } from './accgame.service';
import { AccgameController } from './accgame.controller';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Accgame, AccgameSchema } from './entities/accgame.entity';
import { SubCate, SubCateSchema } from 'src/sub-cate/entities/sub-cate.entity';
import { SubCateService } from 'src/sub-cate/sub-cate.service';
import {
  FlashSell,
  FlashSellSchema,
} from 'src/flash_sell/entities/flash_sell.entity';
import { FlashSellService } from 'src/flash_sell/flash_sell.service';
import { FlashSellModule } from 'src/flash_sell/flash_sell.module';
import { SubCateModule } from 'src/sub-cate/sub-cate.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accgame.name, schema: AccgameSchema },
      { name: SubCate.name, schema: SubCateSchema },
      { name: FlashSell.name, schema: FlashSellSchema },
    ]),
    forwardRef(() => SubCateModule),
    forwardRef(() => FlashSellModule),
    forwardRef(() => CategoryModule),
  ],
  controllers: [AccgameController],
  providers: [
    AccgameService,
    CloudinaryService,
    SubCateService,
    FlashSellService,
  ],
  exports: [AccgameService],
})
export class AccgameModule {}
