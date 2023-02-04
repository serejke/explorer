import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import { EthBlock } from '../eth/schemas/eth.block.schema';
import { EthTransaction } from '../eth/schemas/eth.transaction.schema';

@Injectable()
export class EthWeb3Service {

  private readonly logger: Logger = new Logger(EthWeb3Service.name);

  private readonly web3: Web3;

  constructor(configService: ConfigService) {
    const ethNodeRpcUrl = configService.get<string>('ETH_NODE_RPC_URL');
    this.logger.log('Eth node RPC URL', ethNodeRpcUrl);
    this.web3 = new Web3(ethNodeRpcUrl);
  }

  async loadBlock(blockNumber: number): Promise<{
    block: EthBlock,
    transactions: EthTransaction[]
  }> {
    this.logger.log(`Loading block #${blockNumber}`);
    const block = await this.web3.eth.getBlock(blockNumber, true);

    const ethTransactions: EthTransaction[] = [];
    for (const transaction of block.transactions) {
      if (typeof transaction === 'string') {
        throw new Error('Tx must be hydrated');
      }
      const ethTransaction: EthTransaction = {
        _id: transaction.hash,
        hash: transaction.hash,
        blockNumber: parseInt(block.number.toString()),
        blockHash: block.hash,
        transactionIndex: parseInt(transaction.transactionIndex.toString()),
        from: transaction.from,
        to: transaction.to,
        value: transaction.value.toString(),
        data: transaction.data,
        gas: transaction.gas.toString(),
        gasPrice: transaction.gasPrice.toString(),
      }
      ethTransactions.push(ethTransaction);
    }

    const ethBlock: EthBlock = {
      _id: block.hash,
      number: parseInt(block.number.toString()),
      hash: block.hash,
      timestamp: parseInt(block.timestamp.toString()) * 1000,
      parentHash: block.parentHash,
      gasUsed: block.gasUsed.toString(),
      transactions: ethTransactions.map((tx) => tx.hash)
    };
    return {
      block: ethBlock,
      transactions: ethTransactions
    }
  }

}