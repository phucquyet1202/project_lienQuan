import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import {
  InfoUser,
  InfoUserSchema,
} from 'src/info-user/entities/info-user.entity';
import { InfoUserModule } from 'src/info-user/info-user.module';
import { InfoUserService } from 'src/info-user/info-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: InfoUser.name, schema: InfoUserSchema },
    ]),
    PassportModule,
    ConfigModule,
    InfoUserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, InfoUserService],
  exports: [UserService],
})
export class UserModule {}
