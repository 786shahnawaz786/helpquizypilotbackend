import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as slugify from 'slugify';
import { Article, ArticleDocument, ArticleStatus } from './article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(dto: CreateArticleDto): Promise<ArticleDocument> {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const existing = await this.articleModel.findOne({ slug });
    if (existing) throw new ConflictException(`Article slug "${slug}" already exists`);

    const article = await this.articleModel.create({ ...dto, slug });
    await this.categoriesService.incrementArticleCount(dto.category, 1);
    return article;
  }

  async findAll(query: {
    category?: string;
    status?: ArticleStatus;
    tag?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: ArticleDocument[]; total: number }> {
    const filter: any = { isActive: true };
    if (query.status && query.status !== ('all' as any)) {
      filter.status = query.status;
    } else if (!query.status) {
      filter.status = ArticleStatus.PUBLISHED;
    }
    // status === 'all' → no status filter (admin use)
    if (query.category) filter.category = new Types.ObjectId(query.category);
    if (query.tag) filter.tags = query.tag;

    const limit = query.limit || 20;
    const skip = query.offset || 0;

    const [data, total] = await Promise.all([
      this.articleModel
        .find(filter)
        .populate('category', 'name slug icon color')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.articleModel.countDocuments(filter),
    ]);
    return { data, total };
  }

  async findByCategory(categoryId: string): Promise<ArticleDocument[]> {
    return this.articleModel
      .find({
        category: new Types.ObjectId(categoryId),
        status: ArticleStatus.PUBLISHED,
        isActive: true,
      })
      .populate('category', 'name slug icon color')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findBySlug(slug: string): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ slug, isActive: true })
      .populate('category', 'name slug icon color')
      .populate('relatedArticles', 'title slug excerpt readTime category')
      .exec();
    if (!article) throw new NotFoundException(`Article "${slug}" not found`);
    return article;
  }

  async findById(id: string): Promise<ArticleDocument> {
    const article = await this.articleModel.findById(id).populate('category', 'name slug');
    if (!article) throw new NotFoundException(`Article not found`);
    return article;
  }

  async incrementViews(slug: string): Promise<void> {
    await this.articleModel.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
  }

  async updateHelpfulness(
    id: string,
    helpful: boolean,
  ): Promise<ArticleDocument> {
    const update = helpful
      ? { $inc: { helpfulCount: 1 } }
      : { $inc: { notHelpfulCount: 1 } };
    const article = await this.articleModel.findByIdAndUpdate(id, update, { new: true });
    if (!article) throw new NotFoundException(`Article not found`);
    return article;
  }

  async update(id: string, dto: UpdateArticleDto): Promise<ArticleDocument> {
    const article = await this.articleModel.findByIdAndUpdate(id, dto, { new: true });
    if (!article) throw new NotFoundException(`Article not found`);
    return article;
  }

  async remove(id: string): Promise<void> {
    const article = await this.articleModel.findById(id);
    if (!article) throw new NotFoundException(`Article not found`);
    await this.articleModel.findByIdAndUpdate(id, { isActive: false });
    await this.categoriesService.incrementArticleCount(
      article.category.toString(),
      -1,
    );
  }

  async getPopular(limit = 5): Promise<ArticleDocument[]> {
    return this.articleModel
      .find({ status: ArticleStatus.PUBLISHED, isActive: true })
      .populate('category', 'name slug')
      .sort({ views: -1 })
      .limit(limit)
      .exec();
  }
}
