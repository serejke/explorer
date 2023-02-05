import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EthLoaderModule } from './eth-loader/eth-loader.module';
import { EthModule } from './eth/eth.module';
import { ScheduleModule } from '@nestjs/schedule';

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
    EthLoaderModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot()
  ],
})
export class AppModule {
}
