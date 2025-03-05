import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty({ message: 'Ảnh banner không được để trống' })
  image: { url: string; uri: string };
}
