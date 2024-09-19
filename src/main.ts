import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exceptions.filter';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);

    // TODO: Open this if you want to save logs to file
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(MyLoggerService));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

    app.enableCors();

    app.setGlobalPrefix('/api');
    await app.listen(3000);
}
bootstrap();
