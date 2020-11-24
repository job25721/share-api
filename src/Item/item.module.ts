import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemLogModule } from 'src/ItemLog/ItemLog.module';
import { UserModule } from 'src/User/user.module';
import { ItemResolver } from './item.resolver';
import { ItemSchema } from './item.schema';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    UserModule,
    ItemLogModule,
  ],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
