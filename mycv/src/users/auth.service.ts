import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt=promisify(_scrypt);
@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}

    async singnup(email:string,password:string){
        const users=await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('user in use');
        }

        // add salt in password to reducing rainbow attack
        const salt=randomBytes(8).toString('hex');
        //hash the salt and password together
        const hash=(await scrypt(password,salt,32) ) as Buffer;
        //join hash and salt
        const result=salt+'.'+hash.toString('hex');

        //return
        const user=this.userService.create(email,result);
        return user;


    }

    async signin(email:string,password:string){
        const users= await this.userService.find(email);
        if(!users[0]){
            return new NotFoundException('user not found');
        }

        const [salt,storedhash]=users[0].password.split('.');
        const hash=(await scrypt(password,salt,32)) as Buffer;

        if(storedhash !== hash.toString('hex')){
            return new BadRequestException('bad password');
        } 
        return users[0];

    }
}