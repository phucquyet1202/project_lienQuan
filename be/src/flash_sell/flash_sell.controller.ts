import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlashSellService } from './flash_sell.service';
import { CreateFlashSellDto } from './dto/create-flash_sell.dto';
import { UpdateFlashSellDto } from './dto/update-flash_sell.dto';

@Controller('flash-sell')
export class FlashSellController {
  constructor(private readonly flashSellService: FlashSellService) {}

  @Post()
  create(@Body() createFlashSellDto: CreateFlashSellDto) {
    return this.flashSellService.create(createFlashSellDto);
  }

  @Get()
  findAll() {
    return this.flashSellService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashSellService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlashSellDto: UpdateFlashSellDto) {
    return this.flashSellService.update(+id, updateFlashSellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashSellService.remove(+id);
  }
}
