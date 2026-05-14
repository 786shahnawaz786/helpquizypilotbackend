import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { extname } from 'path';

const ALLOWED_TYPES = /jpeg|jpg|png|gif|webp|svg/;
const MAX_SIZE_MB = 5;

@Injectable()
export class UploadsService {
  private s3Client: S3Client;
  private bucket: string;
  private cdnUrl: string;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get<string>('DO_SPACES_BUCKET') || 'quizypilot-files';
    this.cdnUrl = this.configService.get<string>('DO_SPACES_CDN_URL') || 'https://files.quizypilot.com';

    this.s3Client = new S3Client({
      endpoint: this.configService.get<string>('DO_SPACES_ENDPOINT') || 'https://nyc3.digitaloceanspaces.com',
      region: this.configService.get<string>('DO_SPACES_REGION') || 'nyc3',
      credentials: {
        accessKeyId: this.configService.get<string>('DO_SPACES_KEY') || '',
        secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET') || '',
      },
    });
  }

  /**
   * Sanitize filename: replace spaces with dashes, keep original name
   */
  private sanitizeFilename(originalName: string): string {
    const ext = extname(originalName).toLowerCase();
    const nameWithoutExt = originalName.slice(0, -ext.length);
    // Replace spaces with dashes, remove other special chars except dash and underscore
    const sanitized = nameWithoutExt
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-_]/g, '')
      .toLowerCase();
    return `${sanitized}${ext}`;
  }

  /**
   * Generate unique filename with timestamp to avoid collisions
   */
  private generateUniqueFilename(originalName: string): string {
    const sanitized = this.sanitizeFilename(originalName);
    const ext = extname(sanitized);
    const nameWithoutExt = sanitized.slice(0, -ext.length);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${nameWithoutExt}-${randomSuffix}${ext}`;
  }

  /**
   * Upload file to DigitalOcean Spaces
   */
  async uploadFile(file: Express.Multer.File): Promise<{
    filename: string;
    originalName: string;
    size: number;
    url: string;
    markdown: string;
  }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    const ext = extname(file.originalname).toLowerCase().replace('.', '');
    if (!ALLOWED_TYPES.test(ext)) {
      throw new BadRequestException('Only image files are allowed (jpeg, png, gif, webp, svg)');
    }

    // Validate file size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new BadRequestException(`File size exceeds ${MAX_SIZE_MB}MB limit`);
    }

    const filename = this.generateUniqueFilename(file.originalname);
    const key = `uploads/${filename}`;

    // Get content type
    const contentTypeMap: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    };
    const contentType = contentTypeMap[ext] || 'application/octet-stream';

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: contentType,
          ACL: 'public-read',
        }),
      );

      const url = `${this.cdnUrl}/${key}`;
      const altText = file.originalname.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');

      return {
        filename,
        originalName: file.originalname,
        size: file.size,
        url,
        markdown: `![${altText}](${url})`,
      };
    } catch (error) {
      console.error('Upload to Spaces failed:', error);
      throw new BadRequestException('Failed to upload file to storage');
    }
  }

  /**
   * List all uploaded files from DigitalOcean Spaces
   */
  async listFiles(): Promise<
    Array<{
      filename: string;
      url: string;
      markdown: string;
      size: number;
      uploadedAt: Date;
    }>
  > {
    try {
      const response = await this.s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: 'uploads/',
        }),
      );

      if (!response.Contents) {
        return [];
      }

      return response.Contents
        .filter((obj) => {
          const key = obj.Key || '';
          const ext = extname(key).replace('.', '').toLowerCase();
          return ALLOWED_TYPES.test(ext) && key !== 'uploads/';
        })
        .map((obj) => {
          const key = obj.Key || '';
          const filename = key.replace('uploads/', '');
          const url = `${this.cdnUrl}/${key}`;
          return {
            filename,
            url,
            markdown: `![image](${url})`,
            size: obj.Size || 0,
            uploadedAt: obj.LastModified || new Date(),
          };
        })
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    } catch (error) {
      console.error('List files from Spaces failed:', error);
      return [];
    }
  }

  /**
   * Delete a file from DigitalOcean Spaces
   */
  async deleteFile(filename: string): Promise<{ deleted: string }> {
    if (filename.includes('..') || filename.includes('/')) {
      throw new BadRequestException('Invalid filename');
    }

    const key = `uploads/${filename}`;

    try {
      // Check if file exists
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      // Delete the file
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      return { deleted: filename };
    } catch (error: any) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        throw new NotFoundException('File not found');
      }
      console.error('Delete from Spaces failed:', error);
      throw new BadRequestException('Failed to delete file from storage');
    }
  }
}
