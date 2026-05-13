import {
  Controller, Post, Get, Delete, Patch,
  Body, Param, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateContactDto {
  @ApiProperty({ example: 'Jane Smith' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Problem with embedding quiz', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  subject?: string;

  @ApiProperty({ example: 'I need help with...' })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message: string;
}

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // ── Public: submit a message ──────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a contact / support request' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  // ── Admin: view all messages ──────────────────────────────────────
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all contact submissions' })
  findAll() {
    return this.contactService.findAll();
  }

  @Patch(':id/resolve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Mark submission as resolved' })
  resolve(@Param('id') id: string) {
    return this.contactService.markResolved(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '[Admin] Delete a contact submission' })
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
