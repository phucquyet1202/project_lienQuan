import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';
import { CardLengthValidator } from '../validators/card-length.validator';

export class CreateCardDto {
  infoUserId: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Mã pin không được để trống' })
  @Validate(CardLengthValidator, {
    message: 'Mã pin không hợp lệ',
  })
  pin: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Seri không được để trống' })
  @Validate(CardLengthValidator, {
    message: 'Seri không hợp lệ',
  })
  seri: string;
  @IsNotEmpty({ message: 'Mệnh giá không được để trống' })
  amount: string;
  @IsNotEmpty({ message: 'Loại thẻ không được để trống' })
  type: string;
}
