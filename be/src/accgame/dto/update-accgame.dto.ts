import { PartialType } from '@nestjs/mapped-types';
import { CreateAccgameDto } from './create-accgame.dto';

export class UpdateAccgameDto extends PartialType(CreateAccgameDto) {}
