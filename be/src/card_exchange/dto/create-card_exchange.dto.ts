import { IsNotEmpty } from 'class-validator';

export class CreateCardExchangeDto {
  @IsNotEmpty({ message: 'URL API không được để trống' })
  urlApi: string;
  @IsNotEmpty({ message: 'partnerId không được để trống' })
  partnerId: string;
  @IsNotEmpty({ message: 'partnerKey không được để trống' })
  partnerKey: string;
}
