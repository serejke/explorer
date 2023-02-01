import { BigIntString } from './bigIntString';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EthBlockDocument = HydratedDocument<EthBlock>;

@Schema({
  collection: 'eth-blocks'
})
export class EthBlock {
  @Prop()
  number: BigIntString;

  @Prop()
  hash: string;

  @Prop()
  parentHash: string;

  @Prop()
  gasUsed: BigIntString;

  @Prop([String])
  transactions: string[];
}

export const EthBlockSchema = SchemaFactory.createForClass(EthBlock);