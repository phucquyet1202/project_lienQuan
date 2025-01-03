import { IsNotEmpty } from 'class-validator';

export class CreateLayoutDto {
  @IsNotEmpty({ message: 'Ảnh layout không được để trống' })
  image: { url: string; uri: string };
}
