import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['pkc-l9wvm.ap-southeast-1.aws.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: 'PQK4HCXFH2AV53QU',
          password: '2fbNGuS599Fryc8qf/3EcIJptaGE/H/hFG9x98AWavDrchbURjnRn5RgU5DFIxQP'
        },
      },
      consumer: {
        groupId: "kds-testing-group"
      }
    }
  });
  
  app.listen(() => console.log('Kafka consumer service is listening!'))
}
bootstrap();
