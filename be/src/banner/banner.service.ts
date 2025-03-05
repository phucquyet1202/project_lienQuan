import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Model } from 'mongoose';
import { Banner, BannerDucument } from './entities/banner.entity';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';
import { customException, customResponse } from 'src/helper/response.helper';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDucument>,
    private cloundinaryService: CloudinaryService,
  ) {}
  async create(createBannerDto: CreateBannerDto) {
    try {
      const banner = await this.bannerModel.create(createBannerDto);
      if (!banner) {
        return customException(404, 'Tạo banner thất bại');
      }
      return customResponse(200, 'Tạo banner thành công', banner);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne() {
    try {
      const banner = await this.bannerModel.findOne();
      if (!banner) {
        return customException(404, 'Không tìm thấy banner');
      }
      return customResponse(200, 'Lấy thông tin banner thành công', banner);
    } catch (error) {
      return customException(500, 'Lôi server', error.message);
    }
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    try {
      const banner = await this.bannerModel.findByIdAndUpdate(
        id,
        updateBannerDto,
        { new: true },
      );
      if (!banner) {
        return customException(404, 'Không tìm thấy banner');
      }
      return customResponse(200, 'Cập nhật banner thành công', banner);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const banner = await this.bannerModel.findByIdAndDelete(id);
      if (!banner) {
        return customException(404, 'Xóa banner thất bại');
      }
      await this.cloundinaryService.deleteImage(banner.image.uri);
      return customResponse(200, 'Xóa banner thành công', banner);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
