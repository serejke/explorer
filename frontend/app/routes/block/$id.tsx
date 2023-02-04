import { json, LoaderArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { fetchBlock } from '~/api/explorer.server';
import { Header } from '~/components/Header';
import { DateTime } from 'luxon';

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, "Block ID is not found");
  const block = await fetchBlock(params.id);
  if (block === 'notFound') {
    throw new Response(params.id, { status: 404 });
  }
  return json({ block });
}

const DATE_TIME_FORMAT = 'MMM-dd-yyyy HH:mm:ss';

export default function BlockPage() {
  const { block } = useLoaderData<typeof loader>();
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
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">{block.hash}</dd>
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
                  <div>{block.parentHash}</div>
                </Link>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gas</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{block.gasUsed}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transactions</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div>{block.transactions.map((transaction) => (
                  <Link
                    key={transaction}
                    to={`../transaction/${transaction}`}
                    className="font-mono"
                  >
                    {transaction}
                  </Link>
                ))}</div>
              </dd>
            </div>
          </dl>
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

  if (caught.status === 404) {
    return <div>Block {caught.data} is not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

