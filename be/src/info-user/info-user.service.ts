import { Injectable } from '@nestjs/common';
import { CreateInfoUserDto } from './dto/create-info-user.dto';
import { UpdateInfoUserDto } from './dto/update-info-user.dto';

@Injectable()
export class InfoUserService {
  create(createInfoUserDto: CreateInfoUserDto) {
    return 'This action adds a new infoUser';
  }

  findAll() {
    return `This action returns all infoUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infoUser`;
  }

  update(id: number, updateInfoUserDto: UpdateInfoUserDto) {
    return `This action updates a #${id} infoUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} infoUser`;
  }
}
