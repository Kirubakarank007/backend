import { Body, 
        Controller,
        Delete,
        Get, 
        Param, 
        Patch, 
        Post, 
        Query,
        NotFoundException,
        Session,
        UseGuards
     } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { Serilize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth-guard';

@Controller('auth')
@Serilize(UserDto)
export class UsersController {
    constructor(
        private userService:UsersService,
        private authService:AuthService
        ){}

    @Post('/signup')
    async createUser(@Body()body:CreateUserDto, @Session()session:any ){
        const user=await this.authService.singnup(body.email,body.password);
        session.userId=user.id;
        return user;

    }

    @Post('/signin')
    async signin(@Body()body:CreateUserDto,@Session()session:any){
        const user=await this.authService.signin(body.email,body.password);
        // session.userId=user.id; 
        return user;

    }
    
    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser()user:User){
        return user;
    }
    
    @Post('/signout')
    signOut(@Session()Session:any){
        return Session.userId=null;
    }
    @Get('/colors/:color')
    setColor(@Param('color')color:string,@Session()Session:any){
         Session.color=color;
    }

    @Get('/colors')
    getColor(@Session()Session:any){
        return Session.color;
    }

    @Get('/:id')
    async findUser(@Param('id')id:number){
        const user=await  this.userService.findOne(id);
        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }

    @Get()
    findAllUser(@Query('email')email:string){
        return this.userService.find(email);
    }
    @Delete('/:id')
    deleteUser(@Param('id') id:number){
        return this.userService.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id')id:number,@Body()body:UpdateUserDto){
        return this.userService.update(id,body);
    }
    
}
