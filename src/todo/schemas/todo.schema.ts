import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ToDoDocument = HydratedDocument<ToDo>;

@Schema({ timestamps: true })
export class ToDo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isDone: boolean;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);
