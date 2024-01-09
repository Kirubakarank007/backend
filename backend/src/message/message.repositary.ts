import { Injectable } from "@nestjs/common";
import { readFile,writeFile } from "fs/promises";

@Injectable()
export class MessageRepositary{
    async findOne(id:string){
        const content=await readFile('message.json', 'utf8');
        const message=JSON.parse(content);

        return message[id];
    }

    async findAll(){
        const content=await readFile('message.json','utf8');
        const message=JSON.parse(content);

        return message;
    }

    async createMessage(info:string){
        const content=await readFile('message.json','utf8');
        const message=JSON.parse(content);
        const id=Math.floor(Math.random()*999);

        message[id]={id,info};
        await writeFile('message.json',JSON.stringify(message));

    }

    async deleteMessage(id:string){
        const content=await readFile('message.json','utf8');
        const message=JSON.parse(content);

        delete message[id];
        await writeFile('message.json',JSON.stringify(message));
    }
}