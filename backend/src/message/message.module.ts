import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepositary } from './message.repositary';
@Module({
  controllers: [MessageController],
  providers:[MessageService,MessageRepositary]
})
export class MessageModule {}
