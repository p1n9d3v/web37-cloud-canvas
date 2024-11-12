import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    swaggerConfig(app);

    await app.listen(3000);
}
bootstrap();
