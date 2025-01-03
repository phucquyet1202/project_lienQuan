import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type AccgameDucument = HydratedDocument<Accgame>;
@Schema({ timestamps: true, versionKey: false })
export class Accgame {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubCate' })
  subCateId: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'LogAcc' })
  logAccId: string;
  @Prop({
    type: [
      {
        uri: { type: String },
        url: { type: String },
      },
    ],
  })
  images: { uri: string; url: string }[];
  @Prop({ type: { uri: { type: String }, url: { type: String } } })
  coverPhoto: { uri: string; url: string };
  @Prop({ type: Boolean, default: true })
  status: boolean;
}
export const AccgameSchema = SchemaFactory.createForClass(Accgame);
