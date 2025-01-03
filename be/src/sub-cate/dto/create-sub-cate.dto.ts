import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateSubCateDto {
  categoryId: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên danh mục con không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Ảnh danh mục con không được để trống' })
  image: { url: string; uri: string };
  accgameId: string[];
  status: boolean;
}
