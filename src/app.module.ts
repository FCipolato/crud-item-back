import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://root:root@${process.env.MONGO_DATABASE}:27017`,
    ),
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
