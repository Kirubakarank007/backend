import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptors } from './interceotors/current-user.interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports :[TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    AuthService,
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentUserInterceptors,
    }, ],
  controllers: [UsersController,]
})
export class UsersModule {}
