import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './entities/banner.entity';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
  controllers: [BannerController],
  providers: [BannerService, CloudinaryService],
  exports: [BannerService],
})
export class BannerModule {}
