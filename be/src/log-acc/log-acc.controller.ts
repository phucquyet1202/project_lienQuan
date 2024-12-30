import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogAccService } from './log-acc.service';
import { CreateLogAccDto } from './dto/create-log-acc.dto';
import { UpdateLogAccDto } from './dto/update-log-acc.dto';

@Controller('log-acc')
export class LogAccController {
  constructor(private readonly logAccService: LogAccService) {}

  @Post()
  create(@Body() createLogAccDto: CreateLogAccDto) {
    return this.logAccService.create(createLogAccDto);
  }

  @Get()
  findAll() {
    return this.logAccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logAccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogAccDto: UpdateLogAccDto) {
    return this.logAccService.update(+id, updateLogAccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logAccService.remove(+id);
  }
}
