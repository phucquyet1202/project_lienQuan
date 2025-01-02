import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type SubCateDucument = HydratedDocument<SubCate>;
@Schema({ timestamps: true, versionKey: false })
export class SubCate {
  @Prop({ type: MongooseSchema.ObjectId, ref: 'Category' })
  categoryId: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({
    type: {
      url: { type: String, required: true },
      uri: { type: String, required: true },
    },
  })
  image: { url: string; uri: string };
  @Prop({ type: [{ type: MongooseSchema.ObjectId, ref: 'Accgame' }] })
  accgameId: string[];
  @Prop({ type: Boolean, default: true })
  status: boolean;
}
export const SubCateSchema = SchemaFactory.createForClass(SubCate);
