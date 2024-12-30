import { Injectable } from '@nestjs/common';
import { CreateLogAccDto } from './dto/create-log-acc.dto';
import { UpdateLogAccDto } from './dto/update-log-acc.dto';

@Injectable()
export class LogAccService {
  create(createLogAccDto: CreateLogAccDto) {
    return 'This action adds a new logAcc';
  }

  findAll() {
    return `This action returns all logAcc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logAcc`;
  }

  update(id: number, updateLogAccDto: UpdateLogAccDto) {
    return `This action updates a #${id} logAcc`;
  }

  remove(id: number) {
    return `This action removes a #${id} logAcc`;
  }
}
