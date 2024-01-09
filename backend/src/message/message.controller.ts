import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from 'src/dtos/create-message.dto';
import { MessageService } from './message.service';


@Controller('/message')
export class MessageController {
    constructor(public messageService:MessageService){}

    @Get()
    listmessage(){
        return this.messageService.findAll();
    }
    @Post()
    createmessage(@Body() body:CreateMessageDto){
        return this.messageService.createMessage(body.content);
    }
    @Get('/:id')
    getmessage(@Param('id')id:string){
        return this.messageService.findOne(id);
    }

    @Delete('/delete/:id')
    deletemessage(@Param('id')id:string){
        return this.messageService.deleteMessage(id);
    }
    
}
