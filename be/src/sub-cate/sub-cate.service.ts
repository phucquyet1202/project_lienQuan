import {
  forwardRef,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSubCateDto } from './dto/create-sub-cate.dto';
import { UpdateSubCateDto } from './dto/update-sub-cate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCate, SubCateDucument } from './entities/sub-cate.entity';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';
import { CategoryService } from 'src/category/category.service';
import { AccgameService } from 'src/accgame/accgame.service';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';
import { FlashSellService } from 'src/flash_sell/flash_sell.service';

@Injectable()
export class SubCateService {
  constructor(
    @InjectModel(SubCate.name)
    private readonly subCateModel: Model<SubCateDucument>,
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => AccgameService))
    private readonly accgameService: AccgameService,
    private readonly cloundinaryService: CloudinaryService,
  ) {}

  async create(createSubCateDto: CreateSubCateDto) {
    try {
      const createdSubCate = await this.subCateModel.create(createSubCateDto);
      return customResponse(201, 'Tạo danh mục con thành công', createdSubCate);
    } catch (error) {
      return customException(500, 'Lỗi server', error);
    }
  }

  async findAll() {
    try {
      const subCates = await this.subCateModel.find().exec();
      return customResponse(
        200,
        'Lấy danh sách danh mục con thành công',
        subCates,
      );
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const subCate = await this.subCateModel.findById(id).exec();
      if (!subCate) {
        return customException(404, 'Không tìm thấy danh mục con');
      }
      return customResponse(
        200,
        'Lấy thông tin danh mục con thành công',
        subCate,
      );
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateSubCateDto: UpdateSubCateDto) {
    try {
      const updateOperations: any = {};

      if (updateSubCateDto.name) {
        updateOperations.name = updateSubCateDto.name;
      }
      if (updateSubCateDto.addAccgameId) {
        updateOperations.$push = {
          accgameId: updateSubCateDto.addAccgameId,
        };
      }
      if (updateSubCateDto.removeAccgameId) {
        updateOperations.$pull = {
          accgameId: { $in: updateSubCateDto.removeAccgameId },
        };
      }
      if (updateSubCateDto.image) {
        updateOperations.image = updateSubCateDto.image;
      }
      if (updateSubCateDto.status !== undefined) {
        updateOperations.status = updateSubCateDto.status;
      }

      const updatedSubCate = await this.subCateModel
        .findByIdAndUpdate(id, updateOperations, {
          new: true,
        })
        .exec();

      if (!updatedSubCate) {
        return customException(404, 'Không tìm thấy danh mục con để cập nhật');
      }

      return customResponse(
        200,
        'Cập nhật danh mục con thành công',
        updatedSubCate,
      );
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedSubCate = await this.subCateModel
        .findByIdAndDelete(id)
        .exec();
      await this.cloundinaryService.deleteImage(deletedSubCate.image.uri);

      if (deletedSubCate) {
        await this.categoryService.update(deletedSubCate.categoryId, {
          removeSubCateId: deletedSubCate._id.toString(),
        });
      }
      deletedSubCate?.accgameId?.map(
        async (item: any) => await this.accgameService.remove(item),
      );
      if (!deletedSubCate) {
        return customException(404, 'Không tìm thấy danh mục con để xóa');
      }
      return customResponse(200, 'Xóa danh mục con thành công', deletedSubCate);
    } catch (error) {
      console.log(error);
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
