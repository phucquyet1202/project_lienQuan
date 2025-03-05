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
import { SubCateService } from './sub-cate.service';
import { CreateSubCateDto } from './dto/create-sub-cate.dto';
import { UpdateSubCateDto } from './dto/update-sub-cate.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import {
  FormDataToJsonInterceptor,
  UploadImageInterceptor,
} from 'src/interceptor/convertData';
import { UploadImageOptions } from 'src/utils/custom/customUpImage';

@Controller('sub-cate')
export class SubCateController {
  constructor(private readonly subCateService: SubCateService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 1, multerConfig),
    UploadImageInterceptor,
    FormDataToJsonInterceptor,
  )
  @UploadImageOptions([
    {
      isArray: false,
      serviceName: SubCateService,
      fieldName: 'image',
    },
  ])
  create(@Body() createSubCateDto: CreateSubCateDto) {
    return this.subCateService.create(createSubCateDto);
  }

  @Get()
  findAll() {
    return this.subCateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubCateDto: UpdateSubCateDto) {
    return this.subCateService.update(id, updateSubCateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCateService.remove(id);
  }
}
