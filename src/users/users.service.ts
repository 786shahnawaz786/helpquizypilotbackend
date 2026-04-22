import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase(), isActive: true });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async create(email: string, password: string, name = 'Admin'): Promise<UserDocument> {
    const exists = await this.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(password, 12);
    return this.userModel.create({ email: email.toLowerCase(), passwordHash, name });
  }

  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.userModel.findByIdAndUpdate(id, { passwordHash });
  }

  async ensureDefaultAdmin(): Promise<void> {
    const count = await this.userModel.countDocuments();
    if (count === 0) {
      // Default password is the email address itself
      const defaultEmail = 'admin@helpsystem.io';
      const passwordHash = await bcrypt.hash(defaultEmail, 12);
      await this.userModel.create({
        email: defaultEmail,
        passwordHash,
        name: 'Admin',
        role: 'admin',
      });
    }
  }
}
