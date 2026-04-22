import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Getting Started' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Everything you need to get up and running' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Rocket' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: '#6366f1' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parentCategory?: string;
}
