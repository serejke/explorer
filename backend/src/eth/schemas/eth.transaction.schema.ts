import { BigIntString } from './bigIntString';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EthTransactionDocument = HydratedDocument<EthTransaction>;

@Schema({
  collection: 'eth-transactions'
})
export class EthTransaction {
  @Prop()
  _id: string;

  @Prop({
    index: true
  })
  hash: string;

  @Prop()
  blockNumber: number;

  @Prop({
    index: true
  })
  blockHash: string;

  @Prop()
  transactionIndex: number;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  value: BigIntString;

  @Prop()
  input: string;

  @Prop()
  gas: BigIntString;

  @Prop()
  gasPrice: BigIntString;
}

export const EthTransactionSchema = SchemaFactory.createForClass(EthTransaction);