import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogAccDocument = HydratedDocument<LogAcc>;
@Schema({ timestamps: true, versionKey: false })
export class LogAcc {
  @Prop({ type: String, required: true })
  name: string;
}
export const LogAccSchema = SchemaFactory.createForClass(LogAcc);
