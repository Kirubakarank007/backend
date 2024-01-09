import { Injectable } from "@nestjs/common";
import { MessageRepositary } from "./message.repositary";

@Injectable()
export class MessageService{
    constructor(public messageRepo:MessageRepositary){}

    findOne(id:string){
        return this.messageRepo.findOne(id);
    }
    findAll(){
        return this.messageRepo.findAll();
    }
    createMessage(info:string){
        return this.messageRepo.createMessage(info);
    }
    deleteMessage(id:string){
        return this.messageRepo.deleteMessage(id);
    }

}