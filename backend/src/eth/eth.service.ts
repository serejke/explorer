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

  async createBlock(ethBlock: EthBlock) {
    await this.ethBlockModel.updateOne(
      { _id: ethBlock._id },
      { $setOnInsert: ethBlock },
      { upsert: true }
    );
  }

  async createTransaction(ethTransaction: EthTransaction) {
    await this.ethTransactionModel.updateOne(
      { _id: ethTransaction.hash },
      { $setOnInsert: ethTransaction },
      { upsert: true }
    );
  }

  async findLatestBlocks(count: number): Promise<EthBlock[]> {
    return await this.ethBlockModel
      .find()
      .limit(count)
      .sort({
        'number': -1
      })
      .exec();
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