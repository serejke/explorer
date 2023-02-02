import { BigIntString } from '../schemas/bigIntString';

export class EthBlockDto {
  number: BigIntString;

  hash: string;

  parentHash: string;

  gasUsed: BigIntString;

  transactions: string[];
}
