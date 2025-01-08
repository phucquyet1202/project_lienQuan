import { Module } from '@nestjs/common';
import { InfoUserService } from './info-user.service';
import { InfoUserController } from './info-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoUser, InfoUserSchema } from './entities/info-user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InfoUser.name, schema: InfoUserSchema },
    ]),
  ],
  controllers: [InfoUserController],
  providers: [InfoUserService],
  exports: [InfoUserService],
})
export class InfoUserModule {}
