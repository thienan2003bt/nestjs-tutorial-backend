import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('books')
export class BookController {
    @Get()
    getAllBooks(@Res({ passthrough: true }) res: Response) {
        return res
            .status(HttpStatus.OK)
            .send('This return all books available');
    }
}
