import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyResponseObject = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
};

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponse: MyResponseObject = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        };

        if (exception instanceof HttpException) {
            myResponse.statusCode = exception.getStatus();
            myResponse.response = exception.getResponse();
        } else if (exception instanceof PrismaClientValidationError) {
            myResponse.statusCode = 422;
            myResponse.response = exception.message.replaceAll(/\n/g, '\t');
        } else {
            myResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponse.response = 'Internal Server Error!';
        }

        response.status(myResponse.statusCode).json(myResponse);
        this.logger.error(myResponse.response, AllExceptionFilter.name);

        super.catch(exception, host);
    }
}
