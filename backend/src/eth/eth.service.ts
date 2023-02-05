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
    const latestBlock = await this.findLastBlock();
    return {
      blocks,
      latestBlock: latestBlock?.number
    };
  }

  async findLastBlock(): Promise<EthBlock | undefined> {
    const lastBlock = await this.ethBlockModel
      .find()
      .sort({
        'number': -1
      })
      .limit(1)
      .exec();
    return lastBlock && lastBlock.length > 0 ? lastBlock[0] : undefined;
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
  async findOneBlock(hashOrNumber: string | number): Promise<EthBlock | null> {
    if (typeof hashOrNumber === 'string') {
      return this.ethBlockModel.findOne({ _id: hashOrNumber }).exec();
    }
    return this.ethBlockModel.findOne({ number: hashOrNumber }).exec();
  }

  async findOneTransaction(transactionHash: string): Promise<EthTransaction> {
    return this.ethTransactionModel.findOne({ _id: transactionHash }).exec();
  }

  async findTransactionsByBlockHash(blockHash: string): Promise<EthTransaction[]> {
    return this.ethTransactionModel
      .find({ blockHash })
      .sort({
        'transactionIndex': 1
      })
      .exec();
  }

  async removeBlockByHash(blockHash: string) {
    await this.ethBlockModel.remove({
      _id: blockHash
    }).exec();
  }

  async removeTransactionsByBlockHash(blockHash: string) {
    await this.ethTransactionModel.remove({
      blockHash
    }).exec()
  }
}

export const BLOCKS_RANGE_LIMIT = 50;