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
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import {
  FormDataToJsonInterceptor,
  UploadImageInterceptor,
} from 'src/interceptor/convertData';
import { UploadImageOptions } from 'src/utils/custom/customUpImage';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseInterceptors(
    FilesInterceptor('image', 1, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    {
      isArray: false,
      serviceName: BannerService,
      fieldName: 'image',
    },
  ])
  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Get()
  findAll() {
    return this.bannerService.findOne();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bannerService.fin(id);
  // }

  @UseInterceptors(
    FilesInterceptor('image', 1, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    {
      isArray: false,
      serviceName: BannerService,
      fieldName: 'image',
    },
  ])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
