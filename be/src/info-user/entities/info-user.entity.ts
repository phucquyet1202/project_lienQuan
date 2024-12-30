import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<InfoUser>;
@Schema({ timestamps: true, versionKey: false })
export class InfoUser {
  @Prop({ type: MongooseSchema.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ type: Number, required: true })
  amount: number;
  @Prop({
    type: {
      cardId: { type: String, required: true },
      cardSecret: { type: String, required: true },
    },
    required: true,
  })
  cardTile: {
    cardId: string;
    cardSecret: string;
  };
}
export const InfoUserSchema = SchemaFactory.createForClass(InfoUser);
