import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDucument } from './entities/category.entity';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDucument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.categoryModel.create(createCategoryDto);
      if (!data) {
        return customException(404, 'Tạo danh mục thất bại');
      }
      return customResponse(200, 'Tạo danh mục thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.categoryModel.find().populate('subCateId');
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy danh sách danh mục thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.categoryModel.findById(id).populate('subCateId');
      if (!data) {
        return customException(404, 'Không tìm thấy danh mục');
      }
      return customResponse(200, 'Lấy danh mục thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateOperations: any = {};

      if (updateCategoryDto.name) {
        updateOperations.name = updateCategoryDto.name;
      }
      if (updateCategoryDto.addSubCateId) {
        updateOperations.$push = {
          accgameId: updateCategoryDto.addSubCateId,
        };
      }
      if (updateCategoryDto.removeSubCateId) {
        updateOperations.$pull = {
          accgameId: { $in: updateCategoryDto.removeSubCateId },
        };
      }

      if (updateCategoryDto.status !== undefined) {
        updateOperations.status = updateCategoryDto.status;
      }
      const data = await this.categoryModel.findByIdAndUpdate(
        id,
        updateOperations,
        { new: true },
      );
      if (!data) {
        return customException(404, 'Cập nhật danh mục thất bại');
      }
      return customResponse(200, 'Cập nhật danh mục thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id);
      return customResponse(200, 'Xóa danh mục thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
