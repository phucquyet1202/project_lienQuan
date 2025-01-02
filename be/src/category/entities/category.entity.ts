import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CategoryDucument = HydratedDocument<Category>;
@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Boolean, default: true })
  status: boolean;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SubCate' }] })
  subCateId: string[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
