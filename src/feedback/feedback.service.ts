import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback, FeedbackDocument, FeedbackStatus } from './feedback.schema';
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

  async findAll(query: {
    status?: FeedbackStatus;
    limit?: number;
    offset?: number;
  }): Promise<{ data: FeedbackDocument[]; total: number }> {
    const filter: any = {};
    if (query.status) filter.status = query.status;

    const limit = query.limit || 50;
    const skip = query.offset || 0;

    const [data, total] = await Promise.all([
      this.feedbackModel
        .find(filter)
        .populate('articleId', 'title slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.feedbackModel.countDocuments(filter),
    ]);
    return { data, total };
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

  async getOverallStats(): Promise<{ total: number; unread: number; helpful: number; notHelpful: number }> {
    const [total, unread, helpful, notHelpful] = await Promise.all([
      this.feedbackModel.countDocuments(),
      this.feedbackModel.countDocuments({ status: FeedbackStatus.UNREAD }),
      this.feedbackModel.countDocuments({ helpful: true }),
      this.feedbackModel.countDocuments({ helpful: false }),
    ]);
    return { total, unread, helpful, notHelpful };
  }

  async updateStatus(id: string, status: FeedbackStatus): Promise<FeedbackDocument> {
    const feedback = await this.feedbackModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!feedback) throw new NotFoundException('Feedback not found');
    return feedback;
  }

  async delete(id: string): Promise<void> {
    const result = await this.feedbackModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Feedback not found');
  }
}
