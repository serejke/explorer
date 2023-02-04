import { BigIntString } from '../schemas/bigIntString';

export class EthBlockDto {
  number: BigIntString;

  hash: string;

  parentHash: string;

  timestamp: number;

  gasUsed: BigIntString;

  transactions: string[];
}
