import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as slugify from 'slugify';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
    const slug = slugify(dto.name, { lower: true, strict: true });
    const existing = await this.categoryModel.findOne({ slug });
    if (existing) throw new ConflictException(`Category slug "${slug}" already exists`);
    return this.categoryModel.create({ ...dto, slug });
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .exec();
  }

  async findBySlug(slug: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findOne({ slug, isActive: true });
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);
    return category;
  }

  async findById(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException(`Category not found`);
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryDocument> {
    const category = await this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
    if (!category) throw new NotFoundException(`Category not found`);
    return category;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndUpdate(id, { isActive: false });
    if (!result) throw new NotFoundException(`Category not found`);
  }

  async incrementArticleCount(categoryId: string, delta = 1): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(categoryId, {
      $inc: { articleCount: delta },
    });
  }
}
