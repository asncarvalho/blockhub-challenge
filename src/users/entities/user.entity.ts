import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
    index: true,
  })
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop({ default: true })
  @ApiProperty()
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
