import { Module } from '@nestjs/common';
import { EthWeb3Service } from './eth-web3.service';
import { ConfigModule } from '@nestjs/config';
import { EthLoaderService } from './eth-loader.service';
import { EthModule } from '../eth/eth.module';

@Module({
  imports: [ConfigModule, EthModule],
  providers: [EthWeb3Service, EthLoaderService],
})
export class EthListenerModule {
}