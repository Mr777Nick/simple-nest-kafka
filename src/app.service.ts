import { Inject, Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';

@Injectable()
export class AppService {
  constructor(
    @Inject('HERO_SERVICE') private client: KafkaService
  ) {}

  onModuleInit(): void {
    this.client.subscribeToResponseOf('YIK-1449', this)
  }

  @SubscribeTo('YIK-1449')
  async getWorld(@Payload() message, data: any, key: any, offset: number, timestamp: number, partition: number, headers: IHeaders): Promise<void> {
    console.log(message)
    console.log(data)
    console.log(key)
    console.log(offset)
    console.log(timestamp)
    console.log(partition)
    console.log(headers)
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
