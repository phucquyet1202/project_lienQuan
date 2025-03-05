import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDucument = HydratedDocument<Banner>;

@Schema({ timestamps: true, versionKey: false })
export class Banner {
  @Prop({
    type: {
      url: { type: String, required: true },
      uri: { type: String, required: true },
    },
  })
  image: { url: string; uri: string };
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
