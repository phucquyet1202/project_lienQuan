import { Module } from '@nestjs/common';
import { InfoUserService } from './info-user.service';
import { InfoUserController } from './info-user.controller';

@Module({
  controllers: [InfoUserController],
  providers: [InfoUserService],
})
export class InfoUserModule {}
