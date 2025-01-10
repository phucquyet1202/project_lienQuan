import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCate.name, schema: SubCateSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [SubCateController],
  providers: [SubCateService, CategoryService, CloudinaryService],
  exports: [SubCateService],
})
export class SubCateModule {}
