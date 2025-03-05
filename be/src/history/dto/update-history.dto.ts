import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryDto } from './create-history.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  readonly deleteDetailHistory?: string;
}
