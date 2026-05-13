import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contact.schema';

export interface CreateContactDto {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    return this.contactModel.create(dto);
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).lean();
  }

  async markResolved(id: string): Promise<Contact> {
    return this.contactModel
      .findByIdAndUpdate(id, { status: 'resolved' }, { new: true })
      .lean();
  }

  async remove(id: string): Promise<void> {
    await this.contactModel.findByIdAndDelete(id);
  }
}
