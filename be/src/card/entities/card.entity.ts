import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CardDucument = HydratedDocument<Card>;
@Schema({ timestamps: true, versionKey: false })
export class Card {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'InfoUser' })
  infoUserId: string;
  @Prop({
    type: [
      {
        amount: { type: String, required: true },
        pin: { type: String, required: true },
        seri: { type: String, required: true },
        status: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    required: true,
  })
  card: {
    pin: string;
    amount: string;
    seri: string;
    status: boolean;
    createdAt: string;
  }[];
}
export const CardSchema = SchemaFactory.createForClass(Card);
