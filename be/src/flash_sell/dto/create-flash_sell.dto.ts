import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateFlashSellDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Vui lòng chọn accgame' })
  accgame: [
    {
      accgameId: string;
      originalPrice: number;
    },
  ];
  status: boolean;
}
