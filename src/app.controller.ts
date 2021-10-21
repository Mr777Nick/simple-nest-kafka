import { Controller, Get, Inject } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from '@rob3000/nestjs-kafka';
import { RecordMetadata } from 'kafkajs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('HERO_SERVICE') private client: KafkaService
  ) {}

  @Get()
  getHello() {
    return this.post();
  }

  async post(message: string = 'Hello world'): Promise<RecordMetadata[]> {
    const result = await this.client.send({
      topic: 'YIK-1449',
      messages: [
        {
          key: '1',
          value: JSON.stringify({
            message,
            test: 'test'
          })
        }
      ]
    });

    return result;
  }
}
