import {
  Controller, Post, Get, Delete, Param, UploadedFile,
  UseInterceptors, BadRequestException, Res, NotFoundException, UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, readdirSync, statSync, unlinkSync } from 'fs';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const UPLOADS_DIR = join(process.cwd(), 'uploads');
const ALLOWED_TYPES = /jpeg|jpg|png|gif|webp|svg/;
const MAX_SIZE_MB = 5;

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  // ── Public: serve files ─────────────────────────────────────────
  @Get(':filename')
  @ApiOperation({ summary: 'Serve an uploaded file' })
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    if (filename.includes('..') || filename.includes('/')) {
      throw new BadRequestException('Invalid filename');
    }
    const filePath = join(UPLOADS_DIR, filename);
    if (!existsSync(filePath)) throw new NotFoundException('File not found');
    res.sendFile(filePath);
  }

  // ── Admin-only ──────────────────────────────────────────────────
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase().replace('.', '');
        if (!ALLOWED_TYPES.test(ext)) {
          return cb(new BadRequestException('Only image files are allowed (jpeg, png, gif, webp, svg)'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException('No file provided');
    return {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/api/uploads/${file.filename}`,
      markdown: `![${file.originalname.replace(/\.[^.]+$/, '')}](/api/uploads/${file.filename})`,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] List all uploaded files' })
  listFiles() {
    if (!existsSync(UPLOADS_DIR)) return [];
    return readdirSync(UPLOADS_DIR)
      .filter((f) => ALLOWED_TYPES.test(extname(f).replace('.', '')))
      .map((filename) => {
        const stat = statSync(join(UPLOADS_DIR, filename));
        return {
          filename,
          url: `/api/uploads/${filename}`,
          markdown: `![image](/api/uploads/${filename})`,
          size: stat.size,
          uploadedAt: stat.birthtime,
        };
      })
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  }

  @Delete(':filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Delete an uploaded file' })
  deleteFile(@Param('filename') filename: string) {
    if (filename.includes('..') || filename.includes('/')) {
      throw new BadRequestException('Invalid filename');
    }
    const filePath = join(UPLOADS_DIR, filename);
    if (!existsSync(filePath)) throw new NotFoundException('File not found');
    unlinkSync(filePath);
    return { deleted: filename };
  }
}
