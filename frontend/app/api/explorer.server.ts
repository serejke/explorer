import {
  BlockchainStatusDto,
  Configuration,
  EthApi,
  EthBlockDto,
  EthTransactionDto,
  ResponseError
} from 'explorer-client';
import { SearchResult } from '~/types/search-result';

const configuration = new Configuration({
  basePath: process.env.BACKEND_URL,
});

const explorerApi = new EthApi(configuration);

export async function fetchBlockchainStatus(): Promise<BlockchainStatusDto> {
  return await explorerApi.getBlockchainStatus();
}

export async function fetchBlocks(
  from: number,
  limit: number
): Promise<EthBlockDto[]> {
  return await explorerApi.findBlocks({ from, limit });
}

export async function fetchBlock(id: string): Promise<EthBlockDto | 'notFound'> {
  try {
    return await explorerApi.findOneBlock({
      id
    });
  } catch (e) {
    if (e instanceof Error && e.name === ResponseError.name) {
      return 'notFound';
    }
    throw e;
  }
}

export async function fetchTransaction(hash: string): Promise<EthTransactionDto | 'notFound'> {
  try {
    return await explorerApi.findOneTransaction({
      hash
    });
  } catch (e) {
    if (e instanceof Error && e.name === ResponseError.name) {
      return 'notFound';
    }
    throw e;
  }
}

export async function fetchTransactionsByBlockHash(blockHash: string): Promise<EthTransactionDto[]> {
  return await explorerApi.findTransactionsOfBlock({
    hash: blockHash
  });
}

export function isValidSha256Hash(string: string): boolean {
  const regexExp = /^0x[a-f0-9]{64}$/gi;
  return regexExp.test(string);
}

export function isValidBlockNumber(string: string): boolean {
  const regexExp = /^[1-9][0-9]*$/g;
  return regexExp.test(string);
}

export async function searchTransactionOrBlock(searchString: any): Promise<SearchResult> {
  if (typeof searchString !== 'string') {
    return { type: 'invalidSearch' };
  }

  searchString = searchString.trim();

  if (isValidBlockNumber(searchString)) {
    const block = await fetchBlock(searchString);
    if (block === 'notFound') {
      return { type: 'notFound' };
    }
    return {
      type: 'block',
      blockHash: block.hash
    };
  }

  if (isValidSha256Hash(searchString)) {
    const transaction = await fetchTransaction(searchString);
    if (transaction !== 'notFound') {
      return {
        type: 'transaction',
        transactionHash: transaction.hash
      }
    }

    const block = await fetchBlock(searchString);
    if (block !== 'notFound') {
      return {
        type: 'block',
        blockHash: block.hash
      }
    }

    return { type: 'notFound' };
  }

  return { type: 'invalidSearch' };
}