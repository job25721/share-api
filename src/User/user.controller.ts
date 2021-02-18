import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/user')
export class UserController {
  @Post('facebookSign')
  facebookSign(): string {
    return 'Hello';
  }
}
