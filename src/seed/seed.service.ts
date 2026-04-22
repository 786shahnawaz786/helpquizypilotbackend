import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as slugify from 'slugify';
import { Category, CategoryDocument } from '../categories/category.schema';
import { Article, ArticleDocument } from '../articles/article.schema';
import { UsersService } from '../users/users.service';
import { SEED_CATEGORIES, SEED_ARTICLES } from './seed.data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private readonly usersService: UsersService,
  ) {}

  async onApplicationBootstrap() {
    await this.usersService.ensureDefaultAdmin();
    await this.seed();
  }

  async seed() {
    const catCount = await this.categoryModel.countDocuments();
    if (catCount > 0) {
      this.logger.log('Database already seeded — skipping.');
      return;
    }

    this.logger.log('Seeding database with help center content...');

    // Create categories
    const categoryMap: Record<string, string> = {};
    for (const cat of SEED_CATEGORIES) {
      const slug = slugify(cat.name, { lower: true, strict: true });
      const created = await this.categoryModel.create({ ...cat, slug });
      categoryMap[slug] = created._id.toString();
      this.logger.log(`Created category: ${cat.name}`);
    }

    // Create articles
    for (const art of SEED_ARTICLES) {
      const categoryId = categoryMap[art.categoryKey];
      if (!categoryId) {
        this.logger.warn(`No category found for key: ${art.categoryKey}`);
        continue;
      }
      const slug = slugify(art.title, { lower: true, strict: true });
      await this.articleModel.create({
        title: art.title,
        slug,
        excerpt: art.excerpt,
        content: art.content,
        category: categoryId,
        tags: art.tags,
        readTime: art.readTime,
        status: 'published',
      });
      // Update category articleCount
      await this.categoryModel.findByIdAndUpdate(categoryId, {
        $inc: { articleCount: 1 },
      });
      this.logger.log(`Created article: ${art.title}`);
    }

    this.logger.log(`Seeding complete. ${SEED_ARTICLES.length} articles across ${SEED_CATEGORIES.length} categories.`);
  }
}
