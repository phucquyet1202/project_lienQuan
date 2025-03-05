import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCateDto } from './create-sub-cate.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSubCateDto extends PartialType(CreateSubCateDto) {
  @IsOptional()
  @IsString({
    message: 'Mỗi phần tử trong addAccgameId phải là một chuỗi',
  })
  addAccgameId?: string;

  @IsOptional()
  @IsString({
    message: 'Mỗi phần tử trong removeAccgameId phải là một chuỗi',
  })
  removeAccgameId?: string;
}
