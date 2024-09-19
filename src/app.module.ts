import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './books/book.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './database/database.module';
import { AdminsModule } from './admins/admins.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, DatabaseModule, AdminsModule],
    controllers: [AppController, BookController, UsersController],
    providers: [AppService, UsersService],
})
export class AppModule {}
