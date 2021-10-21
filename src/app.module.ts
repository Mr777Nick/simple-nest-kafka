import { Module } from '@nestjs/common';
import { KafkaModule } from '@rob3000/nestjs-kafka';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    KafkaModule.register([
      {
        name: 'HERO_SERVICE',
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'hero-consumer'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
