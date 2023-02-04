import { BigIntString } from '../schemas/bigIntString';

export class EthBlockDto {
  number: number;

  hash: string;

  parentHash: string;

  timestamp: number;

  gasUsed: BigIntString;

  transactions: string[];
}
