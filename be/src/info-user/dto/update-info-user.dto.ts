import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoUserDto } from './create-info-user.dto';

export class UpdateInfoUserDto extends PartialType(CreateInfoUserDto) {}
