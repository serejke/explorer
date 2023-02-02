import { Injectable, Logger } from '@nestjs/common';
import { EthWeb3Service } from './eth-web3.service';
import { EthService } from '../eth/eth.service';

@Injectable()
export class EthLoaderService {

  constructor(
    private readonly ethWeb3Service: EthWeb3Service,
    private readonly ethService: EthService
  ) {
  }

  async loadBlock(blockNumber: number): Promise<void> {
    const { block, transactions } = await this.ethWeb3Service.loadBlock(blockNumber);
    await this.ethService.createBlock(block);

    for (const transaction of transactions) {
      await this.ethService.createTransaction(transaction);
    }
  }
}