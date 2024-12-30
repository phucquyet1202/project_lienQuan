import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCateDto } from './create-sub-cate.dto';

export class UpdateSubCateDto extends PartialType(CreateSubCateDto) {}
