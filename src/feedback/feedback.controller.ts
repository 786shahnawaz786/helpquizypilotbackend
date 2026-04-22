import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit article feedback' })
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  @Get('article/:articleId')
  @ApiOperation({ summary: 'Get all feedback for an article' })
  findByArticle(@Param('articleId') articleId: string) {
    return this.feedbackService.findByArticle(articleId);
  }

  @Get('article/:articleId/stats')
  @ApiOperation({ summary: 'Get helpful/not-helpful stats for an article' })
  getStats(@Param('articleId') articleId: string) {
    return this.feedbackService.getStats(articleId);
  }
}
