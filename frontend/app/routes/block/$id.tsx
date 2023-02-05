import { json, LoaderArgs, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { fetchBlock, fetchTransactionsByBlockHash } from '~/api/explorer.server';
import { Header } from '~/components/Header';
import { DateTime } from 'luxon';
import classNames from 'classnames';
import { formatEth } from '~/utils/format-eth';
import { formatGas } from '~/utils/format-gas';
import { Hash } from '~/components/Hash';

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, "Block ID is not found");
  const block = await fetchBlock(params.id);
  if (block === 'notFound') {
    return redirect(`/notFound`, { statusText: `Block is not found by ${params.id}`});
  }

  const blockHash = block.hash;
  const transactions = await fetchTransactionsByBlockHash(blockHash);

  return json({ block, transactions });
}

const DATE_TIME_FORMAT = 'MMM-dd-yyyy HH:mm:ss';

export default function BlockPage() {
  const { block, transactions } = useLoaderData<typeof loader>();
  return (
    <div className="mt-4">
      <Header content='Block'/>
      <div className="mx-auto max-w-7xl overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{block.number}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block hash</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                <Hash hash={block.hash}/>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {DateTime.fromMillis(block.timestamp).toFormat(DATE_TIME_FORMAT)} ({DateTime.fromMillis(block.timestamp).toRelative()})
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Parent block hash</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                <Link to={`../${block.parentHash}`} relative='path'>
                  <Hash hash={block.parentHash}/>
                </Link>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gas</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formatGas(block.gasUsed)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <Header content='Transactions'/>
      <div className="mx-auto max-w-7xl flex flex-col justify-between">
        <div className="border border-grey-200 rounded-lg">
          {transactions.map((transaction, index) => (
            <Link
              key={transaction.hash}
              to={`/transaction/${transaction.hash}`}
              className={classNames('px-6', 'rounded-lg', 'py-4', 'flex', 'flex-row', 'justify-between', {
                'bg-white': index % 2 === 0,
                'bg-gray-50': index % 2 !== 1,
              })}
            >
              <div className="w-1/8">
                #{transaction.transactionIndex + 1}
              </div>
              <div className="w-1/5">
                <Hash hash={transaction.hash} truncated/>
              </div>
              <div className="w-2/5">
                <Hash hash={transaction.from} truncated/> {' -> '}
                <Hash hash={transaction.to} truncated/>
              </div>
              <div className="w-1/5">
                {formatEth(transaction.value)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

