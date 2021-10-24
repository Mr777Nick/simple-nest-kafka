import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaModule } from '@rob3000/nestjs-kafka';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    KafkaModule.registerAsync(['KAFKA_SERVICE'], {
      useFactory: async (configService: ConfigService) => {
        const clientId = configService.get('APP_KAFKA_CLIENT_ID');
        const broker = configService.get('APP_KAFKA_BROKERS');
        const groupId = configService.get('APP_KAFKA_GROUP_ID');
        return [
          {
            name: 'KAFKA_SERVICE',
            options: {
              client: {
                clientId,
                brokers: [broker],
              },
              consumer: { groupId },
            },
          },
        ];
      },
      inject: [ConfigService],      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
