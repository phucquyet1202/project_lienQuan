import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { DetailHistoryService } from './detail-history.service';
import { CreateDetailHistoryDto } from './dto/create-detail-history.dto';
import { UpdateDetailHistoryDto } from './dto/update-detail-history.dto';

@Controller('detail-history')
export class DetailHistoryController {
  constructor(private readonly detailHistoryService: DetailHistoryService) {}

  @Post()
  create(@Body() createDetailHistoryDto: CreateDetailHistoryDto) {
    return this.detailHistoryService.create(createDetailHistoryDto);
  }

  @Get()
  findAll() {
    return this.detailHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailHistoryDto: UpdateDetailHistoryDto,
  ) {
    return this.detailHistoryService.update(id, updateDetailHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const idUser: string = req.data.user._id.toString();
    return this.detailHistoryService.remove(id, idUser);
  }
}
