import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contact.schema';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    AuthModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
