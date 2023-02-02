import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EthListenerModule } from './eth-listener/eth-listener.module';
import { EthModule } from './eth/eth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoDbUri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI', mongoDbUri);
        return ({
          uri: mongoDbUri,
        });
      },
      inject: [ConfigService],
    }),
    EthModule,
    EthListenerModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {
}
