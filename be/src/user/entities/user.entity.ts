import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true, default: 'user' })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
