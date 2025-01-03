import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateLogAccDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
}
