import { Injectable, Logger } from '@nestjs/common';
import { EthWeb3Service } from './eth-web3.service';
import { EthService } from '../eth/eth.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EthLoaderService {

  private readonly logger = new Logger(EthLoaderService.name);

  private readonly lastBlocksCount: number;

  private isLoadingLastBlocks = false;

  constructor(
    private readonly ethWeb3Service: EthWeb3Service,
    private readonly ethService: EthService,
    private configService: ConfigService
  ) {
    this.lastBlocksCount = configService.get<number>('ETH_LAST_BLOCKS_COUNT') ?? 0;
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async loadLastBlocksJob() {
    if (this.isLoadingLastBlocks) {
      return;
    }
    this.isLoadingLastBlocks = true;
    try {
      await this.loadLastBlocks();
    } finally {
      this.isLoadingLastBlocks = false;
    }
  }

  private async loadLastBlocks() {
    this.logger.log(`Loading last blocks`);
    const lastBlockNumber = await this.ethWeb3Service.getLastBlockNumber();

    const fromBlock = this.lastBlocksCount === 0 ? 0 : lastBlockNumber - this.lastBlocksCount;
    for (let blockNumber = lastBlockNumber; blockNumber >= fromBlock; blockNumber--) {
      const loadedBlock = await this.ethWeb3Service.loadBlock(blockNumber);
      if (loadedBlock === 'pending') {
        this.logger.log(`Block ${blockNumber} is pending, skipping`);
        continue;
      }

      const existingBlock = await this.ethService.findOneBlock(blockNumber);
      if (existingBlock) {
        if (existingBlock.hash !== loadedBlock.block.hash) {
          this.logger.log(`Reverting ${blockNumber} ${existingBlock.hash} and transactions in favor of block ${loadedBlock.block.hash}`);
          await this.ethService.removeBlockByHash(existingBlock.hash);
          await this.ethService.removeTransactionsByBlockHash(existingBlock.hash);
        } else {
          this.logger.log(`Stop loading at block ${blockNumber} ${existingBlock.hash}`);
          break;
        }
      }

      const { block, transactions } = loadedBlock;
      await this.ethService.createBlock(block);

      for (const transaction of transactions) {
        await this.ethService.createTransaction(transaction);
      }
    }
  }
}