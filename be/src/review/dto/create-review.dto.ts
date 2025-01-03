import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Số điểm không được để trống' })
  rating: number;
}
