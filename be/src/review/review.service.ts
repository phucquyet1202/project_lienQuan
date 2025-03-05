import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDucument } from './entities/review.entity';
import { Model } from 'mongoose';
import { customException, customResponse } from 'src/helper/response.helper';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDucument>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    try {
      const data = await this.reviewModel.create(createReviewDto);
      if (!data) {
        return customException(404, 'Tạo review thất bại');
      }
      return customResponse(200, 'Tạo review thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.reviewModel.find();
      if (!data) {
        return customException(404, 'Không tìm thấy dữ liệu');
      }
      return customResponse(200, 'Lấy danh sách review thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.reviewModel.findById(id);
      if (!data) {
        return customException(404, 'Không tìm thấy review');
      }
      return customResponse(200, 'Lấy review thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const data = await this.reviewModel.findByIdAndUpdate(
        id,
        updateReviewDto,
        { new: true },
      );
      if (!data) {
        return customException(404, 'Cập nhật review thất bại');
      }
      return customResponse(200, 'Cập nhật review thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.reviewModel.findByIdAndDelete(id);
      if (!data) {
        return customException(404, 'Xóa review thất bại');
      }
      return customResponse(200, 'Xóa review thành công', data);
    } catch (error) {
      return customException(500, 'Lỗi server', error.message);
    }
  }
}
