import { Injectable } from '@nestjs/common';
import { CreateSubCateDto } from './dto/create-sub-cate.dto';
import { UpdateSubCateDto } from './dto/update-sub-cate.dto';

@Injectable()
export class SubCateService {
  create(createSubCateDto: CreateSubCateDto) {
    return 'This action adds a new subCate';
  }

  findAll() {
    return `This action returns all subCate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subCate`;
  }

  update(id: number, updateSubCateDto: UpdateSubCateDto) {
    return `This action updates a #${id} subCate`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCate`;
  }
}
