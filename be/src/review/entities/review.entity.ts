import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDucument = HydratedDocument<Review>;
@Schema({ timestamps: true, versionKey: false })
export class Review {
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  rating: number;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
