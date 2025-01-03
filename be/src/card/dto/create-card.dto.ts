import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  infoUserId: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Card không được để trống' })
  card: {
    pin: string;
    seri: string;
  }[];
  status: boolean;
}
