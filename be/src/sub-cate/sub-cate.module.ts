import { forwardRef, Module } from '@nestjs/common';
import { SubCateService } from './sub-cate.service';
import { SubCateController } from './sub-cate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCate, SubCateSchema } from './entities/sub-cate.entity';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';
import { AccgameService } from 'src/accgame/accgame.service';
import { Accgame, AccgameSchema } from 'src/accgame/entities/accgame.entity';
import { AccgameModule } from 'src/accgame/accgame.module';
import { FlashSellModule } from 'src/flash_sell/flash_sell.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCate.name, schema: SubCateSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Accgame.name, schema: AccgameSchema },
    ]),
    forwardRef(() => AccgameModule),
    forwardRef(() => FlashSellModule),
  ],
  controllers: [SubCateController],
  providers: [
    SubCateService,
    CategoryService,
    CloudinaryService,
    AccgameService,
  ],
  exports: [SubCateService],
})
export class SubCateModule {}
