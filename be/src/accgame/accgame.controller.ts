import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AccgameService } from './accgame.service';
import { CreateAccgameDto } from './dto/create-accgame.dto';
import { UpdateAccgameDto } from './dto/update-accgame.dto';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import {
  FormDataToJsonInterceptor,
  UploadImageInterceptor,
} from 'src/interceptor/convertData';
import { UploadImageOptions } from 'src/utils/custom/customUpImage';

@Controller('accgame')
export class AccgameController {
  constructor(private readonly accgameService: AccgameService) {}
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 18 }, // Cho phép tối đa 18 ảnh
        { name: 'coverPhoto', maxCount: 1 }, // Ảnh bìa
      ],
      multerConfig,
    ),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    { isArray: true, serviceName: AccgameService, fieldName: 'image' },
    { isArray: false, serviceName: AccgameService, fieldName: 'coverPhoto' },
  ])
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
    return this.accgameService.findOne(id);
  }
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 18 }, // Cho phép tối đa 18 ảnh
        { name: 'coverPhoto', maxCount: 1 }, // Ảnh bìa
      ],
      multerConfig,
    ),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    { isArray: true, serviceName: AccgameService, fieldName: 'image' },
    { isArray: false, serviceName: AccgameService, fieldName: 'coverPhoto' },
  ])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccgameDto: UpdateAccgameDto) {
    return this.accgameService.update(id, updateAccgameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accgameService.remove(id);
  }
}
