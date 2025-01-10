import { Module } from '@nestjs/common';
import { AccgameService } from './accgame.service';
import { AccgameController } from './accgame.controller';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Accgame, AccgameSchema } from './entities/accgame.entity';
import { SubCate, SubCateSchema } from 'src/sub-cate/entities/sub-cate.entity';
import { SubCateService } from 'src/sub-cate/sub-cate.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accgame.name, schema: AccgameSchema },
      { name: SubCate.name, schema: SubCateSchema },
    ]),
  ],
  controllers: [AccgameController],
  providers: [AccgameService, CloudinaryService, SubCateService],
  exports: [AccgameService],
})
export class AccgameModule {}
