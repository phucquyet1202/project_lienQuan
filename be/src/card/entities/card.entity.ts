import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';
import { HydratedDocument, Schema as MongooseModule } from 'mongoose';

export type CardDucument = HydratedDocument<Card>;
@Schema({ timestamps: true, versionKey: false })
export class Card {
  @Prop({ type: MongooseModule.ObjectId, ref: 'InfoUser' })
  infoUserId: string;
  @Prop({
    type: [
      {
        pin: { type: String, required: true },
        seri: { type: String, required: true },
      },
    ],
    required: true,
  })
  card: Array<{
    pin: string;
    seri: string;
  }>;
  @Prop({ type: Boolean, required: true, default: true })
  status: boolean;
}
export const CardSchema = SchemaFactory.createForClass(Card);
