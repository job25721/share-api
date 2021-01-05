import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHello(): string {
    return 'SHARE API is running..';
  }
}
