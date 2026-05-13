import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

export enum FeedbackStatus {
  UNREAD = 'unread',
  READ = 'read',
  RESOLVED = 'resolved',
}

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

  @Prop({ enum: FeedbackStatus, default: FeedbackStatus.UNREAD })
  status: FeedbackStatus;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
FeedbackSchema.index({ articleId: 1 });
FeedbackSchema.index({ status: 1 });
