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
      `${process.env.PREFIX_MONGO}://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@${process.env.MONGO_DATABASE}`,
    ),
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
