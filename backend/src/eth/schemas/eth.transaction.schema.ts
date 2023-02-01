import { BigIntString } from './bigIntString';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EthTransactionDocument = HydratedDocument<EthTransaction>;

@Schema({
  collection: 'eth-transactions'
})
export class EthTransaction {
  @Prop()
  hash: string;

  @Prop()
  transactionIndex: BigIntString;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  value: BigIntString;

  @Prop()
  data: string;

  @Prop()
  gas: BigIntString;

  @Prop()
  gasPrice: BigIntString;
}

export const EthTransactionSchema = SchemaFactory.createForClass(EthTransaction);