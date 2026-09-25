import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Article & Document;

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ required: true })
  content: string; // Markdown

  @Prop({ required: true, trim: true })
  excerpt: string;

  /**
   * Cover image shown on cards and at the top of the article.
   *
   * Stores whatever /uploads returns — an absolute Spaces URL, or a relative
   * path that the client resolves against the backend origin. Optional: every
   * article that existed before this field has none, and they must keep
   * rendering, so the UI falls back rather than requiring one.
   */
  @Prop({ trim: true, default: '' })
  thumbnail: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ enum: ArticleStatus, default: ArticleStatus.PUBLISHED })
  status: ArticleStatus;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  helpfulCount: number;

  @Prop({ default: 0 })
  notHelpfulCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Article' }], default: [] })
  relatedArticles: Types.ObjectId[];

  @Prop({ default: 5 }) // estimated read time in minutes
  readTime: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ trim: true, default: '' })
  lastUpdatedNote: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ status: 1 });
// Full-text search index
ArticleSchema.index({ title: 'text', content: 'text', excerpt: 'text', tags: 'text' });
