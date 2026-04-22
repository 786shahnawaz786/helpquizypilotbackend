import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
