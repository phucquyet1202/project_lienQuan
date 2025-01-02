import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LayoutDocument = HydratedDocument<Layout>;
@Schema({ timestamps: true, versionKey: false })
export class Layout {
  @Prop({
    type: {
      url: { type: String, required: true },
      uri: { type: String, required: true },
    },
  })
  image: { url: string; uri: string };
}
export const LayoutSchema = SchemaFactory.createForClass(Layout);
