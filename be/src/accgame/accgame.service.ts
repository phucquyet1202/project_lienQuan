import { Injectable } from '@nestjs/common';
import { CreateAccgameDto } from './dto/create-accgame.dto';
import { UpdateAccgameDto } from './dto/update-accgame.dto';

@Injectable()
export class AccgameService {
  create(createAccgameDto: CreateAccgameDto) {
    return 'This action adds a new accgame';
  }

  findAll() {
    return `This action returns all accgame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accgame`;
  }

  update(id: number, updateAccgameDto: UpdateAccgameDto) {
    return `This action updates a #${id} accgame`;
  }

  remove(id: number) {
    return `This action removes a #${id} accgame`;
  }
}
