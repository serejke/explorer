import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { EthBlock, EthBlockDocument } from './schemas/eth.block.schema';
import { EthTransaction } from './schemas/eth.transaction.schema';

@Injectable()
export class EthService {
  constructor(
    @InjectModel(EthBlock.name) private readonly ethBlockModel: Model<EthBlockDocument>,
    @InjectModel(EthTransaction.name) private readonly ethTransactionModel: Model<EthTransaction>,
  ) {
  }

  async createBlock(ethBlock: EthBlock): Promise<EthBlock> {
    return await this.ethBlockModel.create(ethBlock);
  }

  async createTransaction(ethTransaction: EthTransaction): Promise<EthTransaction> {
    return await this.ethTransactionModel.create(ethTransaction);
  }

  async findLatestBlocks(count: number): Promise<EthBlock[]> {
    const options: QueryOptions = {
      limit: count,
      sort: {
        'number': -1
      }
    };
    return await this.ethBlockModel.find({}, undefined, options).exec();
  }

  async findOneBlock(id: string): Promise<EthBlock> {
    if (id.startsWith('0x')) {
      return this.ethBlockModel.findOne({ hash: id }).exec();
    }
    return this.ethBlockModel.findOne({ number: id }).exec();
  }

  async findOneTransaction(transactionHash: string): Promise<EthTransaction> {
    return this.ethTransactionModel.findOne({ hash: transactionHash }).exec();
  }
}

export const LATEST_BLOCKS_LIMIT = 50;