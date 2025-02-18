import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://13.51.162.106:27017/petcare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
