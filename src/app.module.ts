import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './books/book.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
    controllers: [AppController, BookController, UsersController],
    providers: [AppService, UsersService],
})
export class AppModule {}
