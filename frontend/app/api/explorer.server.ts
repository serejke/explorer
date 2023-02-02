import { Configuration, EthApi, EthBlockDto, EthTransactionDto, ResponseError } from 'explorer-client';

const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

export const explorerApi = new EthApi(configuration);

export async function fetchBlock(id: string): EthBlockDto {
  try {
    return await explorerApi.findOneBlock({
      id
    });
  } catch (e) {
    if (e instanceof Error && e.name === ResponseError.name) {
      throw new Response(id, { status: 404 });
    }
    throw e;
  }
}

export async function fetchTransaction(hash: string): EthTransactionDto {
  try {
    return await explorerApi.findOneTransaction({
      hash
    });
  } catch (e) {
    if (e instanceof Error && e.name === ResponseError.name) {
      throw new Response(hash, { status: 404 });
    }
    throw e;
  }
}