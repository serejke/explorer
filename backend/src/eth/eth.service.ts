import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EthBlock, EthBlockDocument } from './schemas/eth.block.schema';
import { EthTransaction } from './schemas/eth.transaction.schema';

@Injectable()
export class EthService {
  constructor(
    @InjectModel(EthBlock.name) private readonly ethBlockModel: Model<EthBlockDocument>,
    @InjectModel(EthTransaction.name) private readonly ethTransactionModel: Model<EthTransaction>,
  ) {}

  async createBlock(ethBlock: EthBlock): Promise<EthBlock> {
    return await this.ethBlockModel.create(ethBlock);
  }

  async createTransaction(ethTransaction: EthTransaction): Promise<EthTransaction> {
    return await this.ethTransactionModel.create(ethTransaction);
  }

  async findOneBlock(number: string): Promise<EthBlock> {
    return this.ethBlockModel.findOne({ number: number }).exec();
  }

  async findOneTransaction(transactionHash: string): Promise<EthTransaction> {
    return this.ethTransactionModel.findOne({ hash: transactionHash }).exec();
  }
}