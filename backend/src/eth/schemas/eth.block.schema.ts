import { BigIntString } from './bigIntString';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EthBlockDocument = HydratedDocument<EthBlock>;

@Schema({
  collection: 'eth-blocks'
})
export class EthBlock {
  @Prop()
  _id: string;

  @Prop({
    index: true
  })
  number: BigIntString;

  @Prop({
    index: true
  })
  hash: string;

  @Prop()
  timestamp: number;

  @Prop()
  parentHash: string;

  @Prop()
  gasUsed: BigIntString;

  @Prop([String])
  transactions: string[];
}

export const EthBlockSchema = SchemaFactory.createForClass(EthBlock);