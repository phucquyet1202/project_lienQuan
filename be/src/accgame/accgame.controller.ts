import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccgameService } from './accgame.service';
import { CreateAccgameDto } from './dto/create-accgame.dto';
import { UpdateAccgameDto } from './dto/update-accgame.dto';

@Controller('accgame')
export class AccgameController {
  constructor(private readonly accgameService: AccgameService) {}

  @Post()
  create(@Body() createAccgameDto: CreateAccgameDto) {
    return this.accgameService.create(createAccgameDto);
  }

  @Get()
  findAll() {
    return this.accgameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accgameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccgameDto: UpdateAccgameDto) {
    return this.accgameService.update(+id, updateAccgameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accgameService.remove(+id);
  }
}
