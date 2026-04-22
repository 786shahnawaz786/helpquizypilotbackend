import {
  Controller, Get, Post, Put, Delete, Patch, Body, Param,
  Query, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleStatus } from './article.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // ── Public read routes ────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List articles with optional filters' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ArticleStatus })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  findAll(
    @Query('category') category?: string,
    @Query('tag') tag?: string,
    @Query('status') status?: ArticleStatus,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.articlesService.findAll({ category, tag, status, limit, offset });
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular articles by view count' })
  getPopular(@Query('limit') limit?: number) {
    return this.articlesService.getPopular(limit || 5);
  }

  @Get('by-category/:categoryId')
  @ApiOperation({ summary: 'Get all articles in a category by category ID' })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.articlesService.findByCategory(categoryId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get article by slug' })
  @ApiParam({ name: 'slug', example: 'how-to-create-your-first-quiz' })
  async findBySlug(@Param('slug') slug: string) {
    const article = await this.articlesService.findBySlug(slug);
    this.articlesService.incrementViews(slug).catch(() => null);
    return article;
  }

  // Public: helpfulness vote (submitted by readers)
  @Patch(':id/helpful')
  @ApiOperation({ summary: 'Mark article as helpful or not helpful' })
  updateHelpfulness(
    @Param('id') id: string,
    @Body('helpful') helpful: boolean,
  ) {
    return this.articlesService.updateHelpfulness(id, helpful);
  }

  // ── Admin-only write routes ───────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Create an article' })
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update an article' })
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '[Admin] Soft-delete an article' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
