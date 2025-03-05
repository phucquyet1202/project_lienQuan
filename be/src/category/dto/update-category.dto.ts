import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsString({
    message: 'Mỗi phần tử trong addSubCateId phải là một chuỗi',
  })
  addSubCateId?: string;

  @IsOptional()
  @IsString({
    message: 'Mỗi phần tử trong removeSubCateId phải là một chuỗi',
  })
  removeSubCateId?: string;
}
