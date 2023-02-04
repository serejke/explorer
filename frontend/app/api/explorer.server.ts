import { Configuration, EthApi, EthBlockDto, EthTransactionDto, ResponseError } from 'explorer-client';
import { SearchResult } from '~/types/search-result';

const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

const explorerApi = new EthApi(configuration);

export async function fetchBlocks(limit: number): Promise<EthBlockDto[]> {
  return await explorerApi.findLatestBlocks({
    limit
  });
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

export function isValidSha256Hash(string: string): boolean {
  const regexExp = /^0x[a-f0-9]{64}$/gi;
  return regexExp.test(string);
}

export function isValidBlockNumber(string: string): boolean {
  const regexExp = /^[1-9][0-9]*$/g;
  return regexExp.test(string);
}

export async function searchTransactionOrBlock(searchString: string): Promise<SearchResult> {
  if (isValidBlockNumber(searchString)) {
    const block = await fetchBlock(searchString);
    if (block === 'notFound') {
      return 'notFound';
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

    return 'notFound';
  }

  return 'invalidSearch';
}