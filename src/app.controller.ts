import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('ok')
  getHello1(): { id: string } {
    return {
      id: '123',
    };
  }
  @Post('p')
  async create(@Body() { id: string }): Promise<{ id: string }> {
    return {  
      id: '23',
    };
  }
}
