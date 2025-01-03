import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<History>;
@Schema({ timestamps: true, versionKey: false })
export class History {
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Card' }] })
  cardId: string[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'infoUser' })
  infoUserId: string;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DetailHistory' }],
  })
  detailHistoryId: string[];
}
export const HistorySchema = SchemaFactory.createForClass(History);
