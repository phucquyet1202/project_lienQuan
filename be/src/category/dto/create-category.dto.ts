import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  name: string;
  status: boolean;
  subCateId: string[];
}
