import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: Types.ObjectId, ref: 'Article', required: true })
  articleId: Types.ObjectId;

  @Prop({ required: true })
  helpful: boolean;

  @Prop({ trim: true, default: '' })
  comment: string;

  @Prop({ trim: true, default: '' })
  email: string; // optional contact
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
FeedbackSchema.index({ articleId: 1 });
