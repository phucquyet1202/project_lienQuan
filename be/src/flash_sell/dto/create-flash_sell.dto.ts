import { Transform } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateFlashSellDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Vui lòng chọn accgame' })
  accgameId: string;
  @IsNotEmpty({ message: 'Giá bán không được để trống' })
  @Min(0, { message: 'Giá bán phải lớn hơn 0' })
  originalPrice: number;
  status?: boolean;
}
