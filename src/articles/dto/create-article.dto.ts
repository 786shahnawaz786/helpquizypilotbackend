import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ArticleStatus } from '../article.schema';

export class CreateArticleDto {
  @ApiProperty({ example: 'How to create your first quiz' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Learn how to build a product recommendation quiz in minutes.' })
  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @ApiProperty({ example: '# How to create your first quiz\n\nStep 1...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '64abc123def456...' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ example: ['quiz', 'getting-started'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: ArticleStatus, default: ArticleStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  readTime?: number;

  @ApiPropertyOptional({ example: ['64abc...', '64def...'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedArticles?: string[];

  @ApiPropertyOptional({ example: 'Updated instructions for v2.0' })
  @IsOptional()
  @IsString()
  lastUpdatedNote?: string;
}
