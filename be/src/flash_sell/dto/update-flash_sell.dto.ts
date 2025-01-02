import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashSellDto } from './create-flash_sell.dto';

export class UpdateFlashSellDto extends PartialType(CreateFlashSellDto) {}
