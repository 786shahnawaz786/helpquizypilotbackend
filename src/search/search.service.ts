import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument, ArticleStatus } from '../articles/article.schema';
import { Category, CategoryDocument } from '../categories/category.schema';

export interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime: number;
  category: { name: string; slug: string; icon: string; color: string };
  tags: string[];
  score: number;
}

export interface CombinedSearchItem {
  _id: string;
  type: 'article' | 'category';
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: { name: string; slug: string };
}

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async search(
    query: string,
    limit = 10,
  ): Promise<{ results: SearchResult[]; total: number; query: string }> {
    if (!query || query.trim().length < 2) {
      return { results: [], total: 0, query };
    }

    const trimmed = query.trim();

    // MongoDB full-text search
    const results = await this.articleModel
      .find(
        {
          $text: { $search: trimmed },
          status: ArticleStatus.PUBLISHED,
          isActive: true,
        },
        { score: { $meta: 'textScore' } },
      )
      .populate('category', 'name slug icon color')
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .lean()
      .exec();

    const mapped: SearchResult[] = results.map((a: any) => ({
      _id: a._id.toString(),
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      readTime: a.readTime,
      category: a.category,
      tags: a.tags,
      score: a.score,
    }));

    return { results: mapped, total: mapped.length, query: trimmed };
  }

  async suggest(query: string): Promise<string[]> {
    if (!query || query.trim().length < 2) return [];
    const regex = new RegExp(query.trim(), 'i');
    const articles = await this.articleModel
      .find({
        title: { $regex: regex },
        status: ArticleStatus.PUBLISHED,
        isActive: true,
      })
      .select('title')
      .limit(8)
      .lean()
      .exec();
    return articles.map((a: any) => a.title);
  }

  async combined(query: string, limit = 8): Promise<CombinedSearchItem[]> {
    if (!query || query.trim().length < 2) return [];
    const regex = new RegExp(query.trim(), 'i');

    // Search categories
    const categories = await this.categoryModel
      .find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
        ],
        isActive: true,
      })
      .select('name slug description icon color')
      .limit(3)
      .lean()
      .exec();

    // Search articles
    const articles = await this.articleModel
      .find({
        $or: [
          { title: { $regex: regex } },
          { excerpt: { $regex: regex } },
        ],
        status: ArticleStatus.PUBLISHED,
        isActive: true,
      })
      .populate('category', 'name slug')
      .select('title slug category')
      .limit(limit - categories.length)
      .lean()
      .exec();

    const results: CombinedSearchItem[] = [
      ...categories.map((c: any) => ({
        _id: c._id.toString(),
        type: 'category' as const,
        title: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        color: c.color,
      })),
      ...articles.map((a: any) => ({
        _id: a._id.toString(),
        type: 'article' as const,
        title: a.title,
        slug: a.slug,
        category: a.category ? { name: a.category.name, slug: a.category.slug } : undefined,
      })),
    ];

    return results;
  }
}
