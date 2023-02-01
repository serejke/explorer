import { Injectable, Logger } from '@nestjs/common';
import { EthWeb3Service } from './eth-web3.service';
import { EthService } from '../eth/eth.service';

@Injectable()
export class EthLoaderService {

  private readonly logger: Logger = new Logger(EthLoaderService.name);

  constructor(
    private readonly ethWeb3Service: EthWeb3Service,
    private readonly ethService: EthService
  ) {
  }

  async loadBlock(blockNumber: number): Promise<void> {
    const { block, transactions } = await this.ethWeb3Service.loadBlock(blockNumber);
    this.logger.log('Block', JSON.stringify(block, null, 2));
    await this.ethService.createBlock(block);

    for (const transaction of transactions) {
      this.logger.log(`Transaction ${transaction.transactionIndex}: ${transaction.hash}`, JSON.stringify(transaction, null, 2));
      await this.ethService.createTransaction(transaction);
    }
  }
}