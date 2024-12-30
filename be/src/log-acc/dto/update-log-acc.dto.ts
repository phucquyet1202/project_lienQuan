import { PartialType } from '@nestjs/mapped-types';
import { CreateLogAccDto } from './create-log-acc.dto';

export class UpdateLogAccDto extends PartialType(CreateLogAccDto) {}
