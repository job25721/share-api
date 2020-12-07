import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemLogModule } from 'src/ItemLog/itemLog.module';
import { RequestResolver } from './request.resolver';
import { RequestSchema } from './request.schema';
import { RequestService } from './request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
    ItemLogModule,
  ],
  providers: [RequestService, RequestResolver],
})
export class RequestModule {}
