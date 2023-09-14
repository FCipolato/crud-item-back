import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fcipolato:iDmMrQcFh2bFYVfl@cluster0.hlsvjqk.mongodb.net/crud-item?retryWrites=true&w=majority',
    ),
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
