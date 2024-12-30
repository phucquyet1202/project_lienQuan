import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfoUserModule } from './info-user/info-user.module';
import { CardModule } from './card/card.module';
import { HistoryModule } from './history/history.module';
import { DetailHistoryModule } from './detail-history/detail-history.module';
import { CategoryModule } from './category/category.module';
import { SubCateModule } from './sub-cate/sub-cate.module';
import { AccgameModule } from './accgame/accgame.module';
import { LogAccModule } from './log-acc/log-acc.module';
import { ReviewModule } from './review/review.module';
import { LayoutModule } from './layout/layout.module';
import { MongooseDatabaseModule } from './utils/connectDatabase.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    InfoUserModule,
    CardModule,
    HistoryModule,
    DetailHistoryModule,
    CategoryModule,
    SubCateModule,
    AccgameModule,
    LogAccModule,
    ReviewModule,
    LayoutModule,
    MongooseDatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
