import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type DetailHistoryDocument = HydratedDocument<DetailHistory>;
@Schema({ timestamps: true, versionKey: false })
export class DetailHistory {
  @Prop({ type: String, required: true })
  nameGame: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: Date, default: Date.now() })
  time: string;
}
export const DetailHistorySchema = SchemaFactory.createForClass(DetailHistory);
