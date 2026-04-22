import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({ default: 'BookOpen' }) // Lucide icon name
  icon: string;

  @Prop({ default: '#6366f1' })
  color: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: 0 })
  articleCount: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parentCategory: Types.ObjectId | null;

  @Prop({ default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ slug: 1 });
CategorySchema.index({ order: 1 });
