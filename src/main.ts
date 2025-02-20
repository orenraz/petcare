import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  console.log(`🚀 Running in ${process.env.NODE_ENV} mode`);
  //console.log(`🟢 Loaded PORT: ${process.env.PORT}`); 
  console.log(`🟢 Loaded PORT: ${port}`); 
  console.log(`Log Level: ${process.env.LOG_LEVEL}`); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
