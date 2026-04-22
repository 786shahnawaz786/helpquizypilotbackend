import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsMongoId()
  articleId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  helpful: boolean;

  @ApiPropertyOptional({ example: 'This article helped me set up my first quiz!' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsOptional()
  @IsString()
  email?: string;
}
