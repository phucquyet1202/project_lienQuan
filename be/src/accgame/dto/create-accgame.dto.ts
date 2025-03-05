import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateAccgameDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  userName: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Không cần trim number
  @IsNotEmpty({ message: 'Giá không được để trống' })
  @Min(0, { message: 'Giá không được âm' })
  @IsNumber({}, { message: 'Giá phải là số' })
  price: number;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  subCateId: string;

  @IsNotEmpty({ message: 'Log đăng nhập không được để trống' })
  logAccId: string;

  @IsNotEmpty({ message: 'Ảnh không được để trống' })
  image: { uri: string; url: string }[];

  @IsNotEmpty({ message: 'Ảnh bìa không được để trống' })
  coverPhoto: { uri: string; url: string };

  status?: boolean;
  isFlashSell?: boolean;
  originalPrice?: number;
  name?: string;
}
