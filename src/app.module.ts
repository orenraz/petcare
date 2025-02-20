import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';
import baseConfig from './config/base.config';
import productionConfig from './config/production.config';
import developmentConfig from './config/development.config';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb://13.51.162.106:27017/petcare', {}),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [
      baseConfig, 
      process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig
    ],
    envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env']   // If NODE_ENV is set, use the corresponding .env file; otherwise, fall back to .env.development
  }),
    HealthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
