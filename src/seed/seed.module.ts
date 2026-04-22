import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../categories/category.schema';
import { Article, ArticleSchema } from '../articles/article.schema';
import { UsersModule } from '../users/users.module';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
    UsersModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
