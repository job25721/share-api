import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from '../Item/item.module';
import { ItemLogModule } from '../ItemLog/itemLog.module';
import { UserModule } from '../User/user.module';
import { RequestResolver } from './request.resolver';
import { RequestSchema } from './request.schema';
import { RequestService } from './request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
    ItemLogModule,
    UserModule,
    ItemModule,
    UserModule,
  ],
  providers: [RequestService, RequestResolver],
})
export class RequestModule {}
