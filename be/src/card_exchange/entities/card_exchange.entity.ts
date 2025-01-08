import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardExchangeDucument = HydratedDocument<CardExchange>;
@Schema({ timestamps: true, versionKey: false })
export class CardExchange {
  @Prop({ type: String, required: true })
  urlApi: string;
  @Prop({ type: String, required: true })
  partnerId: string;
  @Prop({ type: String, required: true })
  partnerKey: string;
}
export const CardExchangeSchema = SchemaFactory.createForClass(CardExchange);
