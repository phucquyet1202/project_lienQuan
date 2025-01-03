import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateAccgameDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  name: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Giá không được để trống' })
  @Min(0, { message: 'Giá không được âm' })
  @IsNumber({}, { message: 'Giá phải là số' })
  price: number;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @Min(0, { message: 'Số lượng không được âm' })
  @IsNumber({}, { message: 'Số lượng phải là số' })
  quantity: number;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  subCateId: string;
  @IsNotEmpty({ message: 'Log đăng nhập không được để trống' })
  logAccId: string;
  @IsNotEmpty({ message: 'Ảnh không được để trống' })
  images: { uri: string; url: string }[];
  @IsNotEmpty({ message: 'ảnh bìa không được để trống' })
  coverPhoto: { uri: string; url: string };
  status: boolean;
}
