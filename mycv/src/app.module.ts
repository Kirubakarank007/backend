import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Report } from './report/repot.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db.sqlite',
    entities:[User,Report],
    synchronize:true,
  }), 
  ReportModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
