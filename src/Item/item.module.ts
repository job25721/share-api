import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemLogModule } from '../ItemLog/itemLog.module';
import { UserModule } from '..//User/user.module';
import { ItemResolver } from './item.resolver';
import { ItemSchema } from './item.schema';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    ItemLogModule,
    UserModule,
  ],
  providers: [ItemResolver, ItemService],
  exports: [ItemService],
})
export class ItemModule {}
