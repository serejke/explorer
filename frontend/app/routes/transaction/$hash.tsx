import { json, LoaderArgs, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { fetchTransaction } from '~/api/explorer.server';
import { Header } from '~/components/Header';
import { formatEth } from '~/utils/format-eth';
import { formatGas } from '~/utils/format-gas';
import { Hash } from '~/components/Hash';

export async function loader({ params }: LoaderArgs) {
  invariant(params.hash, "Transaction hash is not found");
  const transaction = await fetchTransaction(params.hash);
  if (transaction === 'notFound') {
    return redirect('/notFound', { statusText: `Transaction is not found by hash ${params.hash}`});
  }
  return json({ transaction });
}

export default function TransactionPage() {
  const { transaction } = useLoaderData<typeof loader>();
  return (
    <div className="mt-4">
      <Header content='Transaction'/>
      <div className="mx-auto max-w-7xl overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transaction hash</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">{transaction.hash}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <Link to={`../block/${transaction.blockNumber}`}>
                  <div>{transaction.blockNumber}</div>
                </Link>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block hash</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                <Link to={`../block/${transaction.blockHash}`}>
                  <Hash hash={transaction.blockHash}/>
                </Link>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Index in the block</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                <div>{transaction.transactionIndex + 1}</div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">From</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                <Hash hash={transaction.from}/>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">To</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                <Hash hash={transaction.to}/>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gas</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formatGas(transaction.gas)}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gas price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formatEth(transaction.gasPrice)}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Value</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formatEth(transaction.value)}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Data</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <textarea readOnly className="w-full h-48 font-mono rounded-lg bg-gray-50">
                  {transaction.input ? transaction.input : 'N/A'}
                </textarea>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
