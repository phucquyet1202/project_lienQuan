import { Module } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { LayoutController } from './layout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Layout, LayoutSchema } from './entities/layout.entity';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Layout.name, schema: LayoutSchema }]),
  ],
  controllers: [LayoutController],
  providers: [LayoutService, CloudinaryService],
  exports: [LayoutService],
})
export class LayoutModule {}
