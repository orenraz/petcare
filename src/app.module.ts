import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';
import baseConfig from './config/base.config';
import productionConfig from './config/production.config';
import developmentConfig from './config/development.config';
import { UserModule } from './modules/users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

// TODO: break down each init into a seperate function
@Module({
  imports: [
    // TODO: take this data from env file
    MongooseModule.forRoot(
    'mongodb://13.51.162.106:27017/petcare', {
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        baseConfig, 
        process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig
      ],
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env']   // If NODE_ENV is set, use the corresponding .env file; otherwise, fall back to .env.development
    }),
    HealthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
