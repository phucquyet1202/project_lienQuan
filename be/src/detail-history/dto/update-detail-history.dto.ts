import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailHistoryDto } from './create-detail-history.dto';

export class UpdateDetailHistoryDto extends PartialType(CreateDetailHistoryDto) {}
