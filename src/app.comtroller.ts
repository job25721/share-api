import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHello(): string {
    return 'SHARE API v0.1 powered by NestJS GraphQL';
  }
}
