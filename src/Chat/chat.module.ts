import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatSchema } from './chat.schema';
import { ChatService } from './chat.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
