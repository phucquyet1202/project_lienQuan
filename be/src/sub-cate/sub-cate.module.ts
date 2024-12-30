import { Module } from '@nestjs/common';
import { SubCateService } from './sub-cate.service';
import { SubCateController } from './sub-cate.controller';

@Module({
  controllers: [SubCateController],
  providers: [SubCateService],
})
export class SubCateModule {}
