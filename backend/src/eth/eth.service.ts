import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EthBlock, EthBlockDocument } from './schemas/eth.block.schema';
import { EthTransaction } from './schemas/eth.transaction.schema';
import { BlockchainStatusDto } from './dto/blockchain-status.dto';

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

  async getBlockchainStatus(): Promise<BlockchainStatusDto> {
    const blocks = await this.ethBlockModel.count();
    const latestBlock = await this.ethBlockModel
      .find()
      .sort({
        'number': -1
      })
      .limit(1)
      .exec();
    return {
      blocks,
      latestBlock: latestBlock ? latestBlock[0].number : undefined
    };
  }

  async findBlocksFrom(from: number, limit: number): Promise<EthBlock[]> {
    return await this.ethBlockModel
      .find({
        'number': {
          '$gte': from
        }
      })
      .sort({
        'number': 1
      })
      .limit(limit)
      .exec();
  }
  async findOneBlock(id: string): Promise<EthBlock> {
    if (id.startsWith('0x')) {
      return this.ethBlockModel.findOne({ _id: id }).exec();
    }
    return this.ethBlockModel.findOne({ number: id }).exec();
  }

  async findOneTransaction(transactionHash: string): Promise<EthTransaction> {
    return this.ethTransactionModel.findOne({ _id: transactionHash }).exec();
  }
}

export const BLOCKS_RANGE_LIMIT = 50;