import { Inject, Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_SERVICE') private client: KafkaService
  ) {}

  onModuleInit(): void {
    this.client.subscribeToResponseOf('kds-testing', this)
  }

  @SubscribeTo('kds-testing')
  async getWorld(data: any, key: any, offset: number, timestamp: number, partition: number, headers: IHeaders): Promise<void> {
    console.log(data)
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
