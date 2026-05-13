import { Controller, Post, Get, Delete, Patch, Body, Param, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackStatus } from './feedback.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit article feedback' })
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  // ── Admin routes ──────────────────────────────────────────────────

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all feedback' })
  @ApiQuery({ name: 'status', required: false, enum: FeedbackStatus })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  findAll(
    @Query('status') status?: FeedbackStatus,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.feedbackService.findAll({ status, limit, offset });
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get overall feedback stats' })
  getOverallStats() {
    return this.feedbackService.getOverallStats();
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

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update feedback status' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: FeedbackStatus,
  ) {
    return this.feedbackService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '[Admin] Delete feedback' })
  delete(@Param('id') id: string) {
    return this.feedbackService.delete(id);
  }
}
