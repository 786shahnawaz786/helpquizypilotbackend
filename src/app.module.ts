import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SearchModule } from './search/search.module';
import { SeedModule } from './seed/seed.module';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/helpsystem',
    ),
    UsersModule,
    AuthModule,
    ArticlesModule,
    CategoriesModule,
    FeedbackModule,
    SearchModule,
    SeedModule,
    UploadsModule,
  ],
})
export class AppModule {}
