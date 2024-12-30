import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoUserService } from './info-user.service';
import { CreateInfoUserDto } from './dto/create-info-user.dto';
import { UpdateInfoUserDto } from './dto/update-info-user.dto';

@Controller('info-user')
export class InfoUserController {
  constructor(private readonly infoUserService: InfoUserService) {}

  @Post()
  create(@Body() createInfoUserDto: CreateInfoUserDto) {
    return this.infoUserService.create(createInfoUserDto);
  }

  @Get()
  findAll() {
    return this.infoUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infoUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoUserDto: UpdateInfoUserDto) {
    return this.infoUserService.update(+id, updateInfoUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoUserService.remove(+id);
  }
}
