import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Layout, LayoutDocument } from './entities/layout.entity';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';

@Injectable()
export class LayoutService {
  constructor(
    @InjectModel(Layout.name)
    private layoutModel: Model<LayoutDocument>,
    private cloundinaryService: CloudinaryService,
  ) {}
  async create(createLayoutDto: CreateLayoutDto) {
    try {
      const layout = await this.layoutModel.create(createLayoutDto);
      if (!layout) {
        return customException(404, 'Tạo layout thất bại');
      }
      return customResponse(200, 'Tạo layout thành công', layout);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne() {
    try {
      const layout = await this.layoutModel.findOne();
      if (!layout) {
        return customException(404, 'Không tìm thấy layout');
      }
      return customResponse(200, 'Lấy thông tin layout thành công', layout);
    } catch (error) {
      return customException(500, 'Lôi server', error.message);
    }
  }

  async update(id: string, updateLayoutDto: UpdateLayoutDto) {
    try {
      const layout = await this.layoutModel.findByIdAndUpdate(
        id,
        updateLayoutDto,
        { new: true },
      );
      if (!layout) {
        return customException(404, 'Không tìm thấy layout');
      }
      return customResponse(200, 'Cập nhật layout thành công', layout);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const layout = await this.layoutModel.findByIdAndDelete(id);
      if (!layout) {
        return customException(404, 'Xóa layout thất bại');
      }
      await this.cloundinaryService.deleteImage(layout.image.uri);
      return customResponse(200, 'Xóa layout thành công', layout);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
