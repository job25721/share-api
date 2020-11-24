import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemLogSchema } from './ItemLog.schema';
import { ItemLogService } from './ItemLog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ItemLog', schema: ItemLogSchema }]),
  ],
  providers: [ItemLogService],
  exports: [ItemLogService],
})
export class ItemLogModule {}
