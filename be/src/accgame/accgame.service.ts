import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAccgameDto } from './dto/create-accgame.dto';
import { UpdateAccgameDto } from './dto/update-accgame.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Accgame, AccgameDucument } from './entities/accgame.entity';
import { Model } from 'mongoose';
import { SubCateService } from 'src/sub-cate/sub-cate.service';
import { FlashSellService } from 'src/flash_sell/flash_sell.service';
import { customException, customResponse } from 'src/helper/response.helper';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';

@Injectable()
export class AccgameService {
  constructor(
    @InjectModel(Accgame.name)
    private readonly accgameModel: Model<AccgameDucument>,
    @Inject(forwardRef(() => SubCateService))
    private readonly subCateService: SubCateService,
    private readonly flashSellService: FlashSellService,
    private readonly cloundinaryService: CloudinaryService,
  ) {}
  async create(createAccgameDto: CreateAccgameDto) {
    try {
      const data = await this.accgameModel.create(createAccgameDto);
      if (!data) {
        return customException(404, 'Tạo game thất bại');
      }
      await this.subCateService.update(createAccgameDto.subCateId, {
        addAccgameId: data._id.toString(),
      });
      // if (createAccgameDto.isFlashSell == true) {
      //   await this.flashSellService.create({
      //     accgameId: data._id.toString(),
      //     name: createAccgameDto.name,
      //     originalPrice: createAccgameDto.originalPrice,
      //   });
      // }
      return customResponse(200, 'Tạo mới accgame thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.accgameModel
        .find()
        .populate('subCateId')
        .populate('logAccId');
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Danh sách accgame', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.accgameModel
        .findById(id)
        .populate('subCateId')
        .populate('logAccId');
      if (!data) {
        return customException(404, 'Không tìm thấy accgame');
      }
      return customResponse(200, 'Lấy accgame thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateAccgameDto: UpdateAccgameDto) {
    try {
      const data = await this.accgameModel.findByIdAndUpdate(
        id,
        updateAccgameDto,
        { new: true },
      );
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.accgameModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Không tìm thấy accgame');
      }

      data.image.forEach(
        async (image) => await this.cloundinaryService.deleteImage(image.uri),
      );
      await this.subCateService.update(data.subCateId, {
        removeAccgameId: data._id.toString(),
      });
      return customResponse(200, 'Xóa accgame thành công');
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
