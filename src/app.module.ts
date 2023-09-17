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
      `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@cluster0.hlsvjqk.mongodb.net/crud-item?retryWrites=true&w=majority`,
    ),
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
