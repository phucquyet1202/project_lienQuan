import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { LayoutService } from './layout.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import {
  FormDataToJsonInterceptor,
  UploadImageInterceptor,
} from 'src/interceptor/convertData';
import { UploadImageOptions } from 'src/utils/custom/customUpImage';

@Controller('layout')
export class LayoutController {
  private uploadImageOptions: Record<string, any>;
  constructor(private readonly layoutService: LayoutService) {}

  @UseInterceptors(
    FilesInterceptor('image', 1, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    {
      isArray: false,
      serviceName: LayoutService,
      fieldName: 'image',
    },
  ])
  @Post()
  create(@Body() createLayoutDto: CreateLayoutDto) {
    return this.layoutService.create(createLayoutDto);
  }

  @Get()
  findAll() {
    return this.layoutService.findOne();
  }

  @UseInterceptors(
    FilesInterceptor('image', 1, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    {
      isArray: false,
      serviceName: LayoutService,
      fieldName: 'image',
    },
  ])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
    return this.layoutService.update(id, updateLayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layoutService.remove(id);
  }
}
