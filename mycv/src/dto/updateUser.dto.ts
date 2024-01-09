import { IsString,IsEmail,IsOptional } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class UpdateUserDto{
    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    password:string;
}
