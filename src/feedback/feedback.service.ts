import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback, FeedbackDocument } from './feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    private readonly articlesService: ArticlesService,
  ) {}

  async create(dto: CreateFeedbackDto): Promise<FeedbackDocument> {
    // Also update helpfulness counters on the article
    await this.articlesService.updateHelpfulness(dto.articleId, dto.helpful);
    return this.feedbackModel.create(dto);
  }

  async findByArticle(articleId: string): Promise<FeedbackDocument[]> {
    return this.feedbackModel
      .find({ articleId: new Types.ObjectId(articleId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getStats(articleId: string): Promise<{ helpful: number; notHelpful: number; total: number }> {
    const [helpful, notHelpful] = await Promise.all([
      this.feedbackModel.countDocuments({ articleId: new Types.ObjectId(articleId), helpful: true }),
      this.feedbackModel.countDocuments({ articleId: new Types.ObjectId(articleId), helpful: false }),
    ]);
    return { helpful, notHelpful, total: helpful + notHelpful };
  }
}
