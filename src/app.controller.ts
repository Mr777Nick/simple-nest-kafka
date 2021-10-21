import { Controller, Get } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello World';
  }
}
