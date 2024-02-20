import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('t')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('a')
  getA(): string {
    return this.appService.getHello();
  }
}
