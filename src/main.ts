import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new GlobalExceptionFilter(configService));

  // app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('port');
  console.log(`🚀 Running in ${configService.get<string>('nodeEnv')} mode`);
  console.log(`🟢  PORT: ${port}`); 
  console.log(`Log Level: ${configService.get<string>('logLevel')}`); 

  await app.listen(port ?? 3000);
}
bootstrap();
