import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type InfoUserDocument = HydratedDocument<InfoUser>;
@Schema({ timestamps: true, versionKey: false })
export class InfoUser {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ type: Number, default: 0 })
  amount: number;
}
export const InfoUserSchema = SchemaFactory.createForClass(InfoUser);
