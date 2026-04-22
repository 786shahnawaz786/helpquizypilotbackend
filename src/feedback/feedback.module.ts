import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './feedback.schema';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }]),
    ArticlesModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
