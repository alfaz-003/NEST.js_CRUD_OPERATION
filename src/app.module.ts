import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose' ;

@Module({
  imports: [ProductsModule,MongooseModule.forRoot('mongodb+srv://nest:mongo@123@cluster0.ylkxn.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

