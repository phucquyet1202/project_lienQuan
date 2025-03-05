import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type AccgameDucument = HydratedDocument<Accgame>;

@Schema({ timestamps: true, versionKey: false })
export class Accgame {
  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

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
  image: { uri: string; url: string }[];

  @Prop({ type: { uri: { type: String }, url: { type: String } } })
  coverPhoto: { uri: string; url: string };

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Boolean, default: false })
  isFlashSell: boolean;

  @Prop({ type: String, unique: true })
  code: string;
}

export const AccgameSchema = SchemaFactory.createForClass(Accgame);

// Middleware để tự động tạo mã code
AccgameSchema.pre<AccgameDucument>('save', function (next) {
  if (!this.code) {
    this.code = `#${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
  next();
});
