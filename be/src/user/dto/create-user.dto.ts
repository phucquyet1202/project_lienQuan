import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  userName: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;
  role: string;
}
