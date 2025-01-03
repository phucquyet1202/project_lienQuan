import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type FlashSellDucument = HydratedDocument<FlashSell>;
@Schema({ timestamps: true, versionKey: false })
export class FlashSell {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({
    type: [
      {
        accgameId: { type: MongooseSchema.Types.ObjectId, ref: 'Accgame' },
        originalPrice: { type: Number, required: true },
      },
    ],
  })
  accgame: [
    {
      accgameId: string;
      originalPrice: number;
    },
  ];
  @Prop({ type: Boolean, required: true })
  status: boolean;
}
export const FlashSellSchema = SchemaFactory.createForClass(FlashSell);
