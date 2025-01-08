import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { IsLoginGuard } from 'src/guards/login.guard';
import { InfoUserService } from 'src/info-user/info-user.service';

@UseGuards(IsLoginGuard)
@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private infoUserService: InfoUserService,
  ) {}
  @Post()
  async create(@Req() req, @Body() createCardDto: CreateCardDto) {
    const infoUserId = await this.infoUserService.findByIdUser(
      req.user.data._id,
    );
    createCardDto.infoUserId = infoUserId.data._id;
    return this.cardService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
